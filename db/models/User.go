package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        uint `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	Login     string
	Email     string `gorm:"not null"`
	Firstname string
	Surname   string
	Password  string
}
