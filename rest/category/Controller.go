package category

import (
	"fin-tracker/db"
	"fin-tracker/db/models"
	"fin-tracker/rest"
	"github.com/gofiber/fiber/v2"
)

type Controller struct {
	rest.BaseController
}

func (c Controller) Run() {
	c.getAll()
}

func (c Controller) getAll() {
	c.Get("", func(ctx *fiber.Ctx) error {
		categories := make([]models.Category, 0)
		db.DB.
			Model(models.Category{}).
			Find(&categories)
		return ctx.JSON(categories)
	})
}
