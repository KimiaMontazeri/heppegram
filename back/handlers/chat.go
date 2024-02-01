package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"strconv"
)

type ChatHandler struct {
	ChatRepo    repository.Chat
	UserRepo    repository.User
	MessageRepo repository.Message
}

func NewChatHandler(chatRepo repository.Chat, userRepo repository.User, messageRepo repository.Message) *ChatHandler {
	return &ChatHandler{
		ChatRepo:    chatRepo,
		UserRepo:    userRepo,
		MessageRepo: messageRepo,
	}
}

type ChatCreateDTO struct {
	Username string `json:"username"`
}

type ChatResponseDTO struct {
	ID       uint              `json:"id"`
	People   []UserResponseDTO `json:"people"`
	Messages []MessageResponse `json:"messages"`
}

type ChatPreviewDTO struct {
	ID          uint              `json:"id"`
	People      []UserResponseDTO `json:"people"`
	LastMessage MessageResponse   `json:"lastMessage"`
}

func (h *ChatHandler) CreateChat(c echo.Context) error {
	authUsername, ok := c.Get("username").(string)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "User not authenticated")
	}

	chatCreateDTO := new(ChatCreateDTO)
	if err := c.Bind(chatCreateDTO); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	user1, err := h.UserRepo.FindByUsername(authUsername)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	if user1 == nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	user2, err := h.UserRepo.FindByUsername(chatCreateDTO.Username)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	if user2 == nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	chat := &models.Chat{
		People: []models.User{*user1, *user2},
	}

	if err := h.ChatRepo.Create(chat); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error creating chat")
	}

	peopleDTOs := make([]UserResponseDTO, len(chat.People))
	for i, user := range chat.People {
		peopleDTOs[i] = UserResponseDTO{
			ID:        user.ID,
			Firstname: user.Firstname,
			Lastname:  user.Lastname,
			Phone:     user.Phone,
			Username:  user.Username,
			Bio:       user.Bio,
		}
	}

	var messagesResponses []MessageResponse

	chatResponseDTO := ChatResponseDTO{
		ID:       chat.ID,
		People:   peopleDTOs,
		Messages: messagesResponses,
	}

	return c.JSON(http.StatusCreated, chatResponseDTO)
}

func (h *ChatHandler) GetChats(c echo.Context) error {
	authUsername, ok := c.Get("username").(string)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "User not authenticated")
	}

	chats, err := h.ChatRepo.FindAllForUsername(authUsername)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error retrieving chats")
	}

	chatPreviewDTOs := make([]ChatPreviewDTO, 0, len(chats))
	for _, chat := range chats {

		message, err := h.MessageRepo.FindLatestMessageByChatID(chat.ID)
		if err != nil {
			log.Printf("Failed to fetch the latest message for chat ID %d: %v", chat.ID, err)
			return c.JSON(http.StatusInternalServerError, "Failed to fetch the latest message.")
		}

		messageResponse := new(MessageResponse)
		if message != nil {
			user, err := h.UserRepo.FindByID(message.SenderID)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, err.Error())
			}
			if user == nil {
				return c.JSON(http.StatusNotFound, "User not found")
			}

			userResponseDTO := UserResponseDTO{
				ID:        user.ID,
				Firstname: user.Firstname,
				Lastname:  user.Lastname,
				Phone:     user.Phone,
				Username:  user.Username,
				Bio:       user.Bio,
			}

			messageResponse.ID = message.ID
			messageResponse.ChatID = chat.ID
			messageResponse.Content = message.Content
			messageResponse.Timestamp = message.CreatedAt
			messageResponse.Sender = userResponseDTO
		}

		chatPreviewDTO := ChatPreviewDTO{
			ID:          chat.ID,
			People:      make([]UserResponseDTO, 0, len(chat.People)),
			LastMessage: *messageResponse,
		}

		for _, user := range chat.People {
			userDTO := UserResponseDTO{
				ID:        user.ID,
				Firstname: user.Firstname,
				Lastname:  user.Lastname,
				Phone:     user.Phone,
				Username:  user.Username,
				Bio:       user.Bio,
			}
			chatPreviewDTO.People = append(chatPreviewDTO.People, userDTO)
		}

		chatPreviewDTOs = append(chatPreviewDTOs, chatPreviewDTO)
	}

	return c.JSON(http.StatusOK, chatPreviewDTOs)
}

func (h *ChatHandler) GetChat(c echo.Context) error {
	authUsername, ok := c.Get("username").(string)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "User not authenticated")
	}

	id, err := strconv.ParseUint(c.Param("chat_id"), 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid chat ID")
	}

	chat, err := h.ChatRepo.FindByID(uint(id))
	if err != nil {
		log.Printf("error finding chat: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}
	if chat == nil {
		return c.JSON(http.StatusNotFound, "Chat not found")
	}

	isParticipant := false
	for _, user := range chat.People {
		if user.Username == authUsername {
			isParticipant = true
			break
		}
	}
	if !isParticipant {
		return c.JSON(http.StatusForbidden, "Access denied to the chat")
	}

	messages, err := h.MessageRepo.FindMessagesByChatID(uint(id))
	if err != nil {
		log.Printf("error finding message: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}

	MessageResponses := make([]MessageResponse, len(messages))
	for i, message := range messages {
		sender, err := h.UserRepo.FindByID(message.SenderID)
		if err != nil {
			log.Printf("error fetching user details for message sender: %s", err.Error())
			return c.NoContent(http.StatusInternalServerError)
		}
		if sender == nil {
			return c.JSON(http.StatusNotFound, "Sender not found")
		}

		senderDTO := UserResponseDTO{
			ID:        sender.ID,
			Firstname: sender.Firstname,
			Lastname:  sender.Lastname,
			Phone:     sender.Phone,
			Username:  sender.Username,
			Bio:       sender.Bio,
		}

		MessageResponses[i] = MessageResponse{
			ID:        message.ID,
			ChatID:    chat.ID,
			Sender:    senderDTO,
			Content:   message.Content,
			Timestamp: message.CreatedAt,
		}
	}

	peopleDTOs := make([]UserResponseDTO, len(chat.People))
	for i, user := range chat.People {
		peopleDTOs[i] = UserResponseDTO{
			ID:        user.ID,
			Firstname: user.Firstname,
			Lastname:  user.Lastname,
			Phone:     user.Phone,
			Username:  user.Username,
			Bio:       user.Bio,
		}
	}

	chatResponseDTO := ChatResponseDTO{
		ID:       chat.ID,
		People:   peopleDTOs,
		Messages: MessageResponses,
	}

	return c.JSON(http.StatusOK, chatResponseDTO)
}

func (h *ChatHandler) DeleteChat(c echo.Context) error {
	authUsername, ok := c.Get("username").(string)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "User not authenticated")
	}

	id, err := strconv.ParseUint(c.Param("chat_id"), 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid chat ID")
	}

	chat, err := h.ChatRepo.FindByID(uint(id))
	if err != nil {
		log.Printf("error finding chat: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}
	if chat == nil {
		return c.JSON(http.StatusNotFound, "Chat not found")
	}

	isParticipant := false
	for _, user := range chat.People {
		if user.Username == authUsername {
			isParticipant = true
			break
		}
	}
	if !isParticipant {
		return c.JSON(http.StatusForbidden, "Access denied to the chat")
	}

	if err := h.ChatRepo.Delete(uint(id)); err != nil {
		log.Printf("error deleting chat: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusNoContent)

}

func (h *ChatHandler) DeleteMessage(c echo.Context) error {
	authUsername, ok := c.Get("username").(string)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "User not authenticated")
	}

	chatID, err := strconv.ParseUint(c.Param("chat_id"), 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid chat ID")
	}

	messageID, err := strconv.ParseUint(c.Param("message_id"), 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid message ID")
	}

	chat, err := h.ChatRepo.FindByID(uint(chatID))
	if err != nil {
		log.Printf("error finding chat: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}
	if chat == nil {
		return c.JSON(http.StatusNotFound, "Chat not found")
	}

	isParticipant := false
	for _, user := range chat.People {
		if user.Username == authUsername {
			isParticipant = true
			break
		}
	}
	if !isParticipant {
		return c.JSON(http.StatusForbidden, "Access denied to the chat")
	}

	message, err := h.MessageRepo.FindByID(uint(messageID))
	if err != nil {
		log.Printf("error finding message: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}
	if message == nil || message.ChatID != uint(chatID) {
		return c.JSON(http.StatusNotFound, "Message not found in this chat")
	}

	authUser, err := h.UserRepo.FindByUsername(authUsername)
	if err != nil {
		log.Printf("error fetching user details: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}
	if authUser == nil {
		return c.JSON(http.StatusNotFound, "Authenticated user not found")
	}

	if message.SenderID != authUser.ID {
		return c.JSON(http.StatusForbidden, "Only the sender can delete the message")
	}

	if err := h.MessageRepo.Delete(uint(messageID)); err != nil {
		log.Printf("error deleting message: %s", err.Error())
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusNoContent)
}
