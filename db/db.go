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

	if err = db.AutoMigrate(&models.User{}); err != nil {
		log.Fatal("error while auto migrate running", err)
	}

	DB = db
}
