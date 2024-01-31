package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Firstname string `gorm:"type:varchar(100)"`
	Lastname  string `gorm:"type:varchar(100)"`
	Phone     string `gorm:"unique;type:varchar(100)"`
	Username  string `gorm:"unique;type:varchar(100)"`
	Password  string `gorm:"type:varchar(100)"`
	Image     string `gorm:"unique;type:varchar(100)"`
	Bio       string `gorm:"type:text"`
}
