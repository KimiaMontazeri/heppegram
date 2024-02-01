package handlers

import "time"

type MessageDTO struct {
	ID        uint            `json:"id"`
	Sender    UserResponseDTO `json:"sender"`
	Content   string          `json:"content"`
	Timestamp time.Time       `json:"timestamp"`
}
