package handler

import "github.com/gofiber/fiber/v2"

type Error struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
}

var (
	ErrorAlreadyExist     = Error{Message: "Entity already exists", Status: fiber.StatusBadRequest}
	ErrorInvalidRequest   = Error{Message: "Invalid request data", Status: fiber.StatusBadRequest}
	ErrorEntityNotFound   = Error{Message: "Entity not found", Status: fiber.StatusNotFound}
	ErrorUserNotFound     = Error{Message: "User not found", Status: fiber.StatusNotFound}
	ErrorInvalidUserLogin = Error{Message: "Invalid user login data", Status: fiber.StatusBadRequest}
	ErrorServerInternal   = Error{Message: "Internal server error", Status: fiber.StatusInternalServerError}
)
