package models

import (
	"gorm.io/gorm"
	"time"
)

type Transaction struct {
	ID     uint
	UserID uint

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	Sum         float32
	Description string
	CategoryID  uint
	Date        time.Time
}
