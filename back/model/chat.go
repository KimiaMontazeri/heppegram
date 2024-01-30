package model

import (
	"gorm.io/gorm"
	"time"
)

type Chat struct {
	gorm.Model
	People    []uint `gorm:"type:integer[]"`
	CreatedAt time.Time
}
