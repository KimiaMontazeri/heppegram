package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/model"
	"gorm.io/gorm"
)

type GormContactRepository struct {
	DB *gorm.DB
}

func NewGormContactRepository(db *gorm.DB) *GormContactRepository {
	return &GormContactRepository{DB: db}
}

func (repo *GormContactRepository) FindByUserID(userID string) ([]model.Contact, error) {
	var contacts []model.Contact
	result := repo.DB.Where("user_id = ?", userID).Find(&contacts)
	return contacts, result.Error
}

func (repo *GormContactRepository) Create(contact model.Contact) error {
	return repo.DB.Create(&contact).Error
}

func (repo *GormContactRepository) Delete(contact model.Contact) error {
	return repo.DB.Delete(&contact).Error
}
