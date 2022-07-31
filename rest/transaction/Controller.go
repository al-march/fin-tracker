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
	Sum         float32   `json:"sum"`
	Description string    `json:"description"`
	CategoryID  uint      `json:"categoryId"`
	Date        time.Time `json:"date"`
}

func (c Controller) Run() {
	c.create()
}

func (c Controller) create() {
	c.Post("", func(ctx *fiber.Ctx) error {
		user := auth.TakeUser(ctx)
		req := createRequest{}

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
			CategoryID:  req.CategoryID,
			Date:        date,
		}

		db.DB.Save(&entity)
		return ctx.JSON(entity)
	})
}
