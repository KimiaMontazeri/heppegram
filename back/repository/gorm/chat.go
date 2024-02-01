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

func (repo *Chat) FindAllForUsername(username string) ([]*models.Chat, error) {
	var chats []*models.Chat

	result := repo.db.Joins("JOIN chat_users on chat_users.chat_id = chats.id").
		Joins("JOIN users on users.id = chat_users.user_id").
		Where("users.username = ?", username).
		Preload("People").
		Find(&chats)

	if result.Error != nil {
		return nil, result.Error
	}

	return chats, nil
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

func (repo *Chat) GetUserIDsInChat(id uint) ([]uint, error) {
	var userIDs []uint
	chat, err := repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	for _, user := range chat.People {
		userIDs = append(userIDs, user.ID)
	}

	return userIDs, nil
}

func (repo *Chat) Delete(id uint) error {
	result := repo.db.Delete(&models.Chat{}, id)
	return result.Error
}

func (repo *Chat) DeleteMessage(chatID uint, messageID uint) error {
	result := repo.db.Where("chat_id = ?", chatID).Delete(&models.Message{}, messageID)
	return result.Error
}
