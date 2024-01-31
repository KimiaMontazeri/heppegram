package repository

import "github.com/KimiaMontazeri/heppegram/back/models"

type Chat interface {
	Create(chat *models.Chat) error
	FindAll() ([]*models.Chat, error)
	FindByID(id uint) (*models.Chat, error)
	Delete(id uint) error
	DeleteMessage(chatID uint, messageID uint) error
}
