package repository

import "github.com/KimiaMontazeri/heppegram/back/model"

type GroupRepo interface {
	Create(group *model.Group) error
	Delete(id string) error
	AddMember(groupID string, userID string) error
	RemoveMember(groupID string, userID string) error
}
