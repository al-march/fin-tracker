package db

import (
	"fin-tracker/config"
	"fin-tracker/db/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func Init() {
	db, err := gorm.Open(sqlite.Open(config.Data.DbName), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	if err = db.AutoMigrate(
		&models.User{},
		&models.Settings{},
		&models.Category{},
		&models.Transaction{},
	); err != nil {
		log.Fatal("error while auto migrate running", err)
	}

	DB = db

	initCategories()
}

func initCategories() {

	for _, cat := range models.CategoryList {
		DB.Save(&cat)
	}
}
