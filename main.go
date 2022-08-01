package main

import (
	"fin-tracker/config"
	"fin-tracker/db"
	"fin-tracker/rest"
	"fin-tracker/rest/category"
	"fin-tracker/rest/transaction"
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

	runHandlers(app)

	err := app.Listen(":8080")
	if err != nil {
		return
	}
}

func runHandlers(app *fiber.App) {
	userController := user.Controller{BaseController: rest.BaseController{
		App:      app,
		Endpoint: "profile",
	}}
	userController.Run()

	categoryController := category.Controller{BaseController: rest.BaseController{
		App:      app,
		Endpoint: "category",
	}}
	categoryController.Run()

	transactionController := transaction.Controller{BaseController: rest.BaseController{
		App:      app,
		Endpoint: "transaction",
	}}
	transactionController.Run()
}
