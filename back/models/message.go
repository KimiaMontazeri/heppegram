package models

import (
	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	ChatID   uint   `gorm:"foreignKey:ChatID"`
	SenderID uint   `gorm:"foreignKey:UserID"`
	Content  string `gorm:"type:text"`
}
