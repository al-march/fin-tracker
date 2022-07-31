package rest

import "github.com/gofiber/fiber/v2"

const BaseEndpoint = "api/v1/"

type BaseController struct {
	App      *fiber.App
	Endpoint string
}

func (b BaseController) GetEndpoint() string {
	return BaseEndpoint + b.Endpoint
}

func (b BaseController) Post(route string, handlers ...fiber.Handler) {
	b.App.Post(b.GetEndpoint()+route, handlers...)
}

func (b BaseController) Get(route string, handlers ...fiber.Handler) {
	b.App.Get(b.GetEndpoint()+route, handlers...)
}

func (b BaseController) Put(route string, handlers ...fiber.Handler) {
	b.App.Put(b.GetEndpoint()+route, handlers...)
}

func (b BaseController) Delete(route string, handlers ...fiber.Handler) {
	b.App.Delete(b.GetEndpoint()+route, handlers...)
}

func (b BaseController) Patch(route string, handlers ...fiber.Handler) {
	b.App.Patch(b.GetEndpoint()+route, handlers...)
}
