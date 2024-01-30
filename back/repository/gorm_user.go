package repository

import (
	"github.com/KimiaMontazeri/heppegram/back/model"
	"gorm.io/gorm"
)

type GormUserRepository struct {
	DB *gorm.DB
}

func NewGormUserRepository(db *gorm.DB) *GormUserRepository {
	return &GormUserRepository{DB: db}
}

func (repo *GormUserRepository) Create(user *model.User) error {
	return repo.DB.Create(user).Error
}

func (repo *GormUserRepository) FindByID(id string) (*model.User, error) {
	var user model.User
	result := repo.DB.First(&user, "id = ?", id)
	return &user, result.Error
}

func (repo *GormUserRepository) FindByKeyWord(keyword string) ([]*model.User, error) {
	var users []*model.User
	result := repo.DB.Where("username LIKE ? OR firstname LIKE ? OR lastname LIKE ?", "%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%").Find(&users)
	return users, result.Error
}

func (repo *GormUserRepository) Update(user *model.User) error {
	return repo.DB.Save(user).Error
}

func (repo *GormUserRepository) Delete(id string) error {
	return repo.DB.Delete(&model.User{}, "id = ?", id).Error
}
