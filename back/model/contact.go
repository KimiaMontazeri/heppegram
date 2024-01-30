package model

import (
	"gorm.io/gorm"
)

type Contact struct {
	gorm.Model
	UserID      uint   `gorm:"index"`
	ContactID   uint   `gorm:"index"`
	ContactName string `gorm:"type:varchar(100)"`
}
