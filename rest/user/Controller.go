package user

import (
	"errors"
	"fin-tracker/db"
	"fin-tracker/db/models"
	"fin-tracker/rest/handler"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
)

var (
	publicPath  = "api/v1/auth"
	privatePath = "api/v1/user"
)

type Controller struct {
	App *fiber.App
}

func (c Controller) Init() {
	c.signUp()
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
			err := handler.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		if len(request.Login) == 0 {
			err := handler.Error{
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
			err := handler.ErrorAlreadyExist
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

func getHash(p string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(p), bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}
