package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
)

type UserSearchResultDTO struct {
	ID        uint   `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Username  string `json:"username"`
	Image     string `json:"image"`
	Bio       string `json:"bio"`
}

type User interface {
	Create(user *models.User) error
	FindByUsername(username string) (*models.User, error)
	FindByKeyWord(keyword string) ([]*UserSearchResultDTO, error)
	Update(user *models.User) error
	Delete(username string) error
}
