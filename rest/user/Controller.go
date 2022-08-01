package user

import (
	"errors"
	"fin-tracker/auth"
	"fin-tracker/config"
	"fin-tracker/db"
	"fin-tracker/db/models"
	"fin-tracker/rest"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
)

var (
	publicPath = "api/v1/auth"
)

type Controller struct {
	rest.BaseController
}

func (c Controller) Run() {
	c.signUp()
	c.signIn()
	c.info()
	// Settings
	c.updateSettings()
}

func (c Controller) signUp() {
	c.App.Post(publicPath+"/sign-up", func(ctx *fiber.Ctx) error {
		type Registration struct {
			Login    string `json:"login"`
			Password string
		}

		// Если не может спарсить - значит корявый запрос
		var request Registration
		err := ctx.BodyParser(&request)
		if err != nil {
			err := rest.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		if len(request.Login) == 0 {
			err := rest.Error{
				Message: "login is required field",
				Status:  fiber.StatusBadRequest,
			}
			return ctx.Status(err.Status).JSON(err)
		}

		// Проверяем есть ли юзер уже с таким логином
		var user models.User
		result := db.DB.Where(
			models.User{Login: request.Login},
		).First(&user)

		if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
			err := rest.ErrorAlreadyExist
			return ctx.Status(err.Status).JSON(err)
		}

		user = models.User{
			Login:    request.Login,
			Password: getHash(request.Password),
		}

		db.DB.Save(&user)
		return ctx.JSON(user)
	})
}

func (c Controller) signIn() {
	c.App.Post(publicPath+"/sign-in", func(ctx *fiber.Ctx) error {
		type Login struct {
			Login    string
			Password string
		}

		var request Login
		err := ctx.BodyParser(&request)
		if err != nil {
			err := rest.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var user models.User
		result := db.DB.Where(
			models.User{Login: request.Login},
		).First(&user)

		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			err := rest.ErrorUserNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
			err := rest.ErrorInvalidUserLogin
			return ctx.Status(err.Status).JSON(err)
		}

		claims := auth.CreateClaims(user)
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		t, err := token.SignedString([]byte(config.Data.JwtSecret))
		if err != nil {
			err := rest.ErrorServerInternal
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(fiber.Map{
			"user":  user,
			"token": t,
		})
	})
}

func (c Controller) info() {
	c.Get("/info", func(ctx *fiber.Ctx) error {
		u := auth.TakeUser(ctx)

		var user models.User
		err := db.DB.Where("id = ?", u.ID).First(&user).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			err := rest.ErrorServerInternal
			return ctx.Status(err.Status).JSON(err)
		}

		var settings models.Settings
		db.DB.FirstOrCreate(&settings, models.Settings{UserID: user.ID})
		user.Settings = settings

		return ctx.JSON(user)
	})
}

func getHash(p string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

func (c Controller) updateSettings() {
	c.Put("/settings", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)

		var req models.Settings
		if err := ctx.BodyParser(&req); err != nil {
			err := rest.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var settings models.Settings
		db.DB.
			Where("user_id=?", user.ID).
			FirstOrCreate(&settings)

		settings.MonthOutcome = req.MonthOutcome
		settings.MonthIncome = req.MonthIncome

		db.DB.Save(&settings)
		return ctx.JSON(settings)
	})
}
