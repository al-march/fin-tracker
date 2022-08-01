package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Login     string `json:"login"`
	Email     string `gorm:"not null" json:"email"`
	Firstname string `json:"firstname"`
	Surname   string `json:"surname"`
	Password  string `json:"-"`

	Settings Settings `json:"settings"`
}
