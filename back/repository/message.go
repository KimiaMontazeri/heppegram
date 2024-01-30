package repository

type MessageRepo interface {
	DeleteByChatIDAndMessageID(chatID string, messageID string) error
}
