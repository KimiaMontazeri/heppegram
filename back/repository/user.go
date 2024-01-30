package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/model"
)

type UserRepo interface {
	Create(user *model.User) error
	FindByID(id string) (*model.User, error)
	FindByKeyWord(keyword string) ([]*model.User, error)
	Update(user *model.User) error
	Delete(id string) error
}
