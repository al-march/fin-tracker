package auth

import (
	"fin-tracker/db/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

type JwtUser struct {
	Login string
	ID    uint
}

func CreateClaims(u models.User) jwt.MapClaims {
	return jwt.MapClaims{
		"login": u.Login,
		"id":    u.ID,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}
}

func TakeUser(ctx *fiber.Ctx) JwtUser {
	user := ctx.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)

	login := claims["login"].(string)
	id := uint(claims["id"].(float64))

	return JwtUser{
		ID:    id,
		Login: login,
	}
}
