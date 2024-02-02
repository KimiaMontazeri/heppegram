package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"time"
)

type MessageHandler struct {
	ChatRepo    repository.Chat
	UserRepo    repository.User
	MessageRepo repository.Message
}

func NewMessageHandler(chatRepo repository.Chat, userRepo repository.User, messageRepo repository.Message) *MessageHandler {
	return &MessageHandler{
		ChatRepo:    chatRepo,
		UserRepo:    userRepo,
		MessageRepo: messageRepo,
	}
}

type MessageResponse struct {
	ID        uint            `json:"id"`
	ChatID    uint            `json:"chatID"`
	Sender    UserResponseDTO `json:"sender"`
	Content   string          `json:"content"`
	Timestamp time.Time       `json:"timestamp"`
}

type MessageRequest struct {
	ChatID         uint   `json:"chatID"`
	SenderUsername string `json:"senderUsername"`
	Content        string `json:"content" validate:"max=300"`
}
