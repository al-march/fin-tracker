package models

import (
	"gorm.io/gorm"
	"time"
)

type Transaction struct {
	ID         uint `json:"id"`
	UserID     uint `json:"-"`
	CategoryID uint `json:"-"`

	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Sum         float32   `json:"sum"`
	Description string    `json:"description"`
	Category    Category  `json:"category"`
	Date        time.Time `json:"date"`
}
