package transaction

import (
	"fin-tracker/auth"
	"fin-tracker/db"
	"fin-tracker/db/models"
	"fin-tracker/rest"
	"github.com/gofiber/fiber/v2"
	"time"
)

type Controller struct {
	rest.BaseController
}

type createRequest struct {
	Sum         float32         `json:"sum"`
	Description string          `json:"description"`
	Category    models.Category `json:"category"`
	Date        time.Time       `json:"date"`
	Profit      bool            `json:"profit"`
}

func (c Controller) Run() {
	c.create()
	c.update()
	c.delete()
	c.getAll()
	c.getOne()
}

func (c Controller) create() {
	c.Post("", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)

		var req createRequest
		if err := ctx.BodyParser(&req); err != nil {
			err := rest.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		// If Request.Date is Zero:
		// Set time to Now by default
		date := req.Date
		if req.Date.IsZero() {
			date = time.Now()
		}

		entity := models.Transaction{
			UserID:      user.ID,
			Sum:         req.Sum,
			Description: req.Description,
			CategoryID:  req.Category.ID,
			Profit:      req.Profit,
			Date:        date,
		}

		db.DB.Save(&entity)

		var cat models.Category
		db.DB.Where("id=?", req.Category.ID).First(&cat)
		entity.Category = cat

		return ctx.JSON(entity)
	})
}

func (c Controller) getAll() {
	c.Get("", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		trans := make([]models.Transaction, 0)
		db.DB.
			Where("user_id=?", user.ID).
			Preload("Category").
			Find(&trans)
		return ctx.JSON(trans)
	})
}

func (c Controller) getOne() {
	c.Get("/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		id := ctx.Params("id", "-1")

		var tran models.Transaction
		err := db.DB.
			Where("id=? AND user_id=?", id, user.ID).
			Preload("Category").
			First(&tran).
			Error

		if err != nil {
			err := rest.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		return ctx.JSON(tran)
	})
}

func (c Controller) update() {
	c.Put("/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		id := ctx.Params("id", "-1")
		var req createRequest
		if err := ctx.BodyParser(&req); err != nil {
			err := rest.ErrorInvalidRequest
			return ctx.Status(err.Status).JSON(err)
		}

		var entity models.Transaction
		err := db.DB.
			Where("id=? AND user_id=?", id, user.ID).
			First(&entity).
			Error

		if err != nil {
			err := rest.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		entity.Sum = req.Sum
		entity.Date = req.Date
		entity.Description = req.Description
		entity.Category = req.Category
		entity.Profit = req.Profit
		db.DB.Save(&entity)

		var cat models.Category
		db.DB.Where("id=?", req.Category.ID).First(&cat)
		entity.Category = cat

		return ctx.JSON(entity)
	})
}

func (c Controller) delete() {
	c.Delete("/:id", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		id := ctx.Params("id", "-1")

		var entity models.Transaction
		err := db.DB.
			Where("id=? AND user_id=?", id, user.ID).
			First(&entity).
			Error
		if err != nil {
			err := rest.ErrorEntityNotFound
			return ctx.Status(err.Status).JSON(err)
		}

		db.DB.Delete(&entity)
		return ctx.SendStatus(fiber.StatusOK)
	})
}
