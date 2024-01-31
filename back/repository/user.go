package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/handlers"
	"github.com/KimiaMontazeri/heppegram/back/models"
)

type User interface {
	Create(user *models.User) error
	FindByID(id uint) (*models.User, error)
	FindByUsername(username string) (*models.User, error)
	FindByKeyWord(keyword string) ([]*handlers.UserSearchResultDTO, error)
	Update(user *models.User) error
	Delete(id uint) error
}
