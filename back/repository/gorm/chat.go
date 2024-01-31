package gorm

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"gorm.io/gorm"
)

type Chat struct {
	db *gorm.DB
}

func NewChatRepo(db *gorm.DB) *Chat {
	return &Chat{db: db}
}

func (repo *Chat) Create(chat *models.Chat) error {
	result := repo.db.Create(chat)
	return result.Error
}

func (repo *Chat) FindAll() ([]*models.Chat, error) {
	var chats []*models.Chat
	result := repo.db.Preload("People").Find(&chats)
	return chats, result.Error
}

func (repo *Chat) FindByID(id uint) (*models.Chat, error) {
	var chat models.Chat
	result := repo.db.Preload("People").First(&chat, id)
	return &chat, result.Error
}

func (repo *Chat) Delete(id uint) error {
	result := repo.db.Delete(&models.Chat{}, id)
	return result.Error
}

func (repo *Chat) DeleteMessage(chatID uint, messageID uint) error {
	result := repo.db.Where("chat_id = ?", chatID).Delete(&models.Message{}, messageID)
	return result.Error
}
