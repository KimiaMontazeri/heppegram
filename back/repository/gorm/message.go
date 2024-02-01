package gorm

import (
	"errors"
	"github.com/KimiaMontazeri/heppegram/back/models"
	"gorm.io/gorm"
)

type Message struct {
	db *gorm.DB
}

func NewMessageRepo(db *gorm.DB) *Message {
	return &Message{db: db}
}

func (repo *Message) Create(message *models.Message) error {
	result := repo.db.Create(message)
	return result.Error
}

func (repo *Message) FindLatestMessageByChatID(chatID uint) (*models.Message, error) {
	var message models.Message
	result := repo.db.Where("chat_id = ?", chatID).Order("created_at DESC").First(&message)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &message, nil
}

func (repo *Message) FindMessagesByChatID(chatID uint) ([]*models.Message, error) {
	var messages []*models.Message
	result := repo.db.Where("chat_id = ?", chatID).Order("created_at DESC").Find(&messages)
	if result.Error != nil {
		return nil, result.Error
	}
	return messages, nil
}

func (repo *Message) FindByID(messageID uint) (*models.Message, error) {
	var message models.Message
	result := repo.db.Where("id = ?", messageID).First(&message)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &message, nil
}

func (repo *Message) Delete(messageID uint) error {
	result := repo.db.Delete(&models.Message{}, messageID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
