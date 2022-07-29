package db

import (
	"fin-tracker/db/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func Init() {
	db, err := gorm.Open(sqlite.Open("fin-tracker.test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	if err = db.AutoMigrate(
		&models.User{},
		&models.Category{},
	); err != nil {
		log.Fatal("error while auto migrate running", err)
	}

	DB = db

	initCategories()
}

func initCategories() {
	categories := []models.Category{
		{ID: 1, Name: "food"},
		{ID: 2, Name: "transport"},
		{ID: 3, Name: "home"},
		{ID: 4, Name: "fan"},
		{ID: 5, Name: "health"},
		{ID: 6, Name: "rent"},
		{ID: 7, Name: "subscription"},
		{ID: 8, Name: "restaurant"},
	}

	for _, cat := range categories {
		DB.FirstOrCreate(&cat)
	}
}
