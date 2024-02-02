package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"github.com/KimiaMontazeri/heppegram/back/utils"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"sync"
	"time"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type WSHandler struct {
	ChatRepo    repository.Chat
	UserRepo    repository.User
	MessageRepo repository.Message
	WSManager   *WSManager
}

func NewWSHandler(chatRepo repository.Chat, userRepo repository.User, messageRepo repository.Message, wsManager *WSManager) *WSHandler {
	return &WSHandler{
		ChatRepo:    chatRepo,
		UserRepo:    userRepo,
		MessageRepo: messageRepo,
		WSManager:   wsManager,
	}
}

type WSConn struct {
	Conn *websocket.Conn
	mu   sync.Mutex
}

type UserConn struct {
	UserID uint
	Conn   *websocket.Conn
}

type WSManager struct {
	clients    map[uint]*WSConn
	clientsMu  sync.RWMutex
	register   chan *UserConn
	unregister chan uint
}

func NewWSManager() *WSManager {
	manager := &WSManager{
		clients:    make(map[uint]*WSConn),
		register:   make(chan *UserConn),
		unregister: make(chan uint),
	}
	go manager.run()
	return manager
}

func (manager *WSManager) run() {
	for {
		select {
		case userConn := <-manager.register:
			log.Println("registering connection to user: ", userConn.UserID)
			manager.clientsMu.Lock()
			manager.clients[userConn.UserID] = &WSConn{Conn: userConn.Conn}
			manager.clientsMu.Unlock()
		case userID := <-manager.unregister:
			log.Println("unregistering connection to user: ", userID)
			manager.clientsMu.Lock()
			if conn, ok := manager.clients[userID]; ok {
				delete(manager.clients, userID)
				err := conn.Conn.Close()
				if err != nil {
					log.Println("error closing connection:", err)
				}
			}
			manager.clientsMu.Unlock()
		}
	}
}

func (h *WSHandler) SendMessageToChatMembers(chatID uint, senderID uint, messageResponse MessageResponse) {
	userIDs, err := h.ChatRepo.GetUserIDsInChat(chatID)
	if err != nil {
		log.Printf("Error retrieving user IDs for chat %d: %v", chatID, err)
		return
	}

	h.WSManager.clientsMu.RLock()
	defer h.WSManager.clientsMu.RUnlock()

	for _, userID := range userIDs {
		log.Println("sending message to user if present: ", userID)
		if wsConn, ok := h.WSManager.clients[userID]; ok {
			wsConn.mu.Lock()
			err := wsConn.Conn.WriteJSON(messageResponse)
			wsConn.mu.Unlock()
			log.Println("message sent to user: ", userID)
			if err != nil {
				log.Printf("Error sending message to user %d: %v", userID, err)
			}
		}
	}
}

func (h *WSHandler) HandleWS(c echo.Context) error {
	log.Println("new ws request")
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return err
	}
	defer func(ws *websocket.Conn) {
		log.Println("closing primary connection")
		err := ws.Close()
		if err != nil {
			log.Printf("Failed to close the WebSocket connection: %v\n", err)
		}
	}(ws)

	token := c.Param("token")
	authUsername, err := utils.ParseJWT(token)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "invalid or expired JWT")
	}
	if authUsername == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "User not authenticated")
	}

	user, err := h.UserRepo.FindByUsername(authUsername)
	if err != nil {
		log.Println("Error fetching user details:", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Error fetching user details")
	}
	if user == nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	h.WSManager.register <- &UserConn{UserID: user.ID, Conn: ws}
	defer func() { h.WSManager.unregister <- user.ID }()

	time.Sleep(200 * time.Millisecond)

	log.Println("registered as user: ", user.Username)

	for {
		var msgRequest MessageRequest
		err := ws.ReadJSON(&msgRequest)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Websocket error: %v", err)
			} else {
				log.Printf("Read error: %v", err)
			}
			break
		}

		log.Printf("Received message from user %d in chat %d: %s\n", user.ID, msgRequest.ChatID, msgRequest.Content)

		newMessage := &models.Message{
			ChatID:   msgRequest.ChatID,
			SenderID: user.ID,
			Content:  msgRequest.Content,
		}

		err = h.MessageRepo.Create(newMessage)
		if err != nil {
			log.Println("Error saving message to database:", err)
			continue
		}

		messageResponse := MessageResponse{
			ID:     newMessage.ID,
			ChatID: newMessage.ChatID,
			Sender: UserResponseDTO{
				ID:        user.ID,
				Firstname: user.Firstname,
				Lastname:  user.Lastname,
				Phone:     user.Phone,
				Username:  user.Username,
				Bio:       user.Bio,
			},
			Content:   newMessage.Content,
			Timestamp: newMessage.CreatedAt,
		}

		h.SendMessageToChatMembers(newMessage.ChatID, user.ID, messageResponse)
	}

	return nil
}
