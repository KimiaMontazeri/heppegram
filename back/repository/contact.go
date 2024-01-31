package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
)

type Contact interface {
	FindByUserID(username string) ([]models.Contact, error)
	Create(contact *models.Contact) error
	Delete(username uint, contactID uint) error
}
