package models

import (
	"gorm.io/gorm"
)

type Chat struct {
	gorm.Model
	People []User `gorm:"many2many:chat_users;"`
}
