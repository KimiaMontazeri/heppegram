package repository

import "github.com/KimiaMontazeri/heppegram/back/model"

type ChatRepo interface {
	Create(chat *model.Chat) error
	FindAll() ([]*model.Chat, error)
	FindByID(id string) (*model.Chat, error)
	Delete(id string) error
}
