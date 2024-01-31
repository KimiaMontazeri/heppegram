package models

import (
	"gorm.io/gorm"
)

type Contact struct {
	gorm.Model
	UserID        uint   `gorm:"foreignKey:UserID"`
	ContactUserID uint   `gorm:"foreignKey:ContactID"`
	ContactName   string `gorm:"type:varchar(100)"`
}
