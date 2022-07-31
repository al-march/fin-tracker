package category

import (
	"fin-tracker/db"
	"fin-tracker/db/models"
	"fin-tracker/rest"
	"github.com/gofiber/fiber/v2"
)

const Path = "api/v1/category"

type Controller struct {
	rest.BaseController
}

func (c Controller) Run() {
	c.getAll()
}

func (c Controller) getAll() {
	c.App.Get(Path, func(ctx *fiber.Ctx) error {
		categories := make([]models.Category, 0)
		db.DB.
			Model(models.Category{}).
			Find(&categories)
		return ctx.JSON(categories)
	})
}
