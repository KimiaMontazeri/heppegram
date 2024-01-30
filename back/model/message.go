package model

import (
	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	ChatID   uint   `gorm:"index"`
	Sender   uint   `gorm:"index"`
	Receiver uint   `gorm:"index"`
	Content  string `gorm:"type:text"`
}
