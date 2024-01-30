package model

import "gorm.io/gorm"

type Group struct {
	gorm.Model
	Name   string `gorm:"type:varchar(100)"`
	People []uint `gorm:"type:integer[]"`
}
