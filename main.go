package main

import (
	"fin-tracker/config"
	"fin-tracker/db"
	"fin-tracker/rest"
	"fin-tracker/rest/category"
	"fin-tracker/rest/user"
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"strings"
)

func main() {
	config.Data.Init()
	db.Init()

	app := fiber.New()

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(config.Data.JwtSecret),
		Filter: func(ctx *fiber.Ctx) bool {
			path := ctx.Path()
			if strings.Contains(path, "/auth/") {
				return true
			}
			return !strings.Contains(path, "/api/")
		},
	}))

	initControllers(app)

	err := app.Listen(":8080")
	if err != nil {
		return
	}
}

func initControllers(app *fiber.App) {
	c := rest.BaseController{App: app}

	userC := user.Controller{BaseController: c}
	catC := category.Controller{BaseController: c}

	userC.Init()
	catC.Init()
}
