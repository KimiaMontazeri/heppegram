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
