package gorm

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"gorm.io/gorm"
)

type Contact struct {
	db *gorm.DB
}

func NewContactRepo(db *gorm.DB) *Contact {
	return &Contact{db: db}
}

func (repo *Contact) FindByUserID(userID uint) ([]models.Contact, error) {
	var contacts []models.Contact
	result := repo.db.Where("user_id = ?", userID).Find(&contacts)
	return contacts, result.Error
}

func (repo *Contact) Create(contact *models.Contact) error {
	result := repo.db.Create(contact)
	return result.Error
}

func (repo *Contact) Delete(userID uint, contactID uint) error {
	result := repo.db.Where("user_id = ? AND contact_id = ?", userID, contactID).Delete(&models.Contact{})
	return result.Error
}
