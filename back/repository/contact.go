package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
)

type Contact interface {
	FindByUserID(userID uint) ([]models.Contact, error)
	Create(contact *models.Contact) error
	Delete(userID uint, contactID uint) error
}
