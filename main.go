package main

import (
	"fin-tracker/config"
	"fin-tracker/db"
)

func main() {
	config.Data.Init()
	db.Init()
}
