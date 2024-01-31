package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
)

type User interface {
	Create(user *models.User) error
	FindByID(id uint) (*models.User, error)
	FindByKeyWord(keyword string) ([]*models.User, error)
	Update(user *models.User) error
	Delete(id uint) error
}
