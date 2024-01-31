package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type ChatHandler struct {
	ChatRepo repository.Chat
}

func NewChatHandler(chatRepo repository.Chat) *ChatHandler {
	return &ChatHandler{ChatRepo: chatRepo}
}

func (h *ChatHandler) CreateChat(c echo.Context) error {
	chat := new(models.Chat)
	if err := c.Bind(chat); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := h.ChatRepo.Create(chat); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, chat)
}

func (h *ChatHandler) GetAllChats(c echo.Context) error {
	chats, err := h.ChatRepo.FindAll()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, chats)
}

func (h *ChatHandler) GetChat(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("chat_id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid chat ID")
	}

	chat, err := h.ChatRepo.FindByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	if chat == nil {
		return echo.NewHTTPError(http.StatusNotFound, "Chat not found")
	}

	return c.JSON(http.StatusOK, chat)
}

func (h *ChatHandler) DeleteChat(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("chat_id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid chat ID")
	}

	if err := h.ChatRepo.Delete(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *ChatHandler) DeleteMessage(c echo.Context) error {
	chatID, err := strconv.ParseUint(c.Param("chat_id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid chat ID")
	}
	messageID, err := strconv.ParseUint(c.Param("message_id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid message ID")
	}

	if err := h.ChatRepo.DeleteMessage(uint(chatID), uint(messageID)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}
