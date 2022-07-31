package rest

import "github.com/gofiber/fiber/v2"

type BaseController struct {
	App  *fiber.App
	Init func()
}
