package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/model"
)

type ContactRepo interface {
	FindByUserID(userID string) ([]model.Contact, error)
	Create(contact model.Contact) error
	Delete(contact model.Contact) error
}
