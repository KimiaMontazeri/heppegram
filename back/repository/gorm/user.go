package gorm

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"gorm.io/gorm"
)

type User struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) *User {
	return &User{db: db}
}

func (repo *User) Create(user *models.User) error {
	result := repo.db.Create(user)
	return result.Error
}

func (repo *User) FindByID(id uint) (*models.User, error) {
	var user models.User
	result := repo.db.First(&user, "id = ?", id)
	return &user, result.Error
}

func (repo *User) FindByKeyWord(keyword string) ([]*models.User, error) {
	var users []*models.User
	result := repo.db.Where("firstname LIKE ? OR lastname LIKE ?", "%"+keyword+"%", "%"+keyword+"%").Find(&users)
	return users, result.Error
}

func (repo *User) Update(user *models.User) error {
	result := repo.db.Save(user)
	return result.Error
}

func (repo *User) Delete(id uint) error {
	result := repo.db.Delete(&models.User{}, id)
	return result.Error
}
