package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
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

type MessageRequestWS struct {
	ChatID         uint   `json:"chatID"`
	SenderUsername string `json:"senderUsername"`
	Content        string `json:"content"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *ChatHandler) HandleWebSocket(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println(err)
		return err
	}
	defer func(ws *websocket.Conn) {
		err := ws.Close()
		if err != nil {

		}
	}(ws)

	authUsername := c.Get("username").(string)
	if authUsername == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "User not authenticated")
	}

	user, err := h.UserRepo.FindByUsername(authUsername)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error fetching user details")
	}
	if user == nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("Received: %s\n", msg)

		// Process the message and potentially send messages in response
		// You can define different types of messages (e.g., new message, typing indicator, etc.)
		// and handle them here

		err = ws.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}

	return nil
}
