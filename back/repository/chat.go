package repository

import "github.com/KimiaMontazeri/heppegram/back/models"

type Chat interface {
	Create(chat *models.Chat) error
	FindAllForUsername(username string) ([]*models.Chat, error)
	FindAll() ([]*models.Chat, error)
	FindByID(id uint) (*models.Chat, error)
	GetUserIDsInChat(id uint) ([]uint, error)
	Delete(id uint) error
	DeleteMessage(chatID uint, messageID uint) error
}
