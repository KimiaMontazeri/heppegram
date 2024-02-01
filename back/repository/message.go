package repository

import "github.com/KimiaMontazeri/heppegram/back/models"

type Message interface {
	Create(message *models.Message) error
	FindLatestMessageByChatID(chatID uint) (*models.Message, error)
	FindMessagesByChatID(chatID uint) ([]*models.Message, error)
	FindByID(messageID uint) (*models.Message, error)
	Delete(messageID uint) error
}
