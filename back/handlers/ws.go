package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type (
	WSHandler struct {
		chatRepo    repository.Chat
		userRepo    repository.User
		messageRepo repository.Message
		clients     map[*Client]bool
		broadcast   chan MessageResponse // Inbound messages to be broadcasted
		register    chan *Client         // Register requests from the clients
		unregister  chan *Client         // Unregister requests from clients
	}

	Client struct {
		hub  *WSHandler
		conn *websocket.Conn
		send chan MessageResponse
		uid  uint
	}
)

func NewWSHandler(chatRepo repository.Chat, userRepo repository.User, messageRepo repository.Message) *WSHandler {
	return &WSHandler{
		chatRepo:    chatRepo,
		userRepo:    userRepo,
		messageRepo: messageRepo,
		broadcast:   make(chan MessageResponse),
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		clients:     make(map[*Client]bool),
	}
}

func (h *WSHandler) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}

func (h *WSHandler) HandleWS(c echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return err
	}
	defer func(ws *websocket.Conn) {
		err := ws.Close()
		if err != nil {
			log.Printf("Failed to close the WebSocket connection: %v\n", err)
		}
	}(ws)

	authUsername := c.Get("username").(string)
	if authUsername == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "User not authenticated")
	}

	user, err := h.userRepo.FindByUsername(authUsername)
	if err != nil {
		log.Println("Error fetching user details:", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Error fetching user details")
	}
	if user == nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	client := &Client{conn: ws, uid: user.ID}
	h.clients[client] = true
	h.register <- client

	go client.writePump()

	for {
		var msgRequest MessageRequest
		err := ws.ReadJSON(&msgRequest)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Websocket error: %v", err)
			} else {
				log.Printf("Read error: %v", err)
			}
			delete(h.clients, client)
			break
		}

		log.Printf("Received message from user %d in chat %d: %s\n", user.ID, msgRequest.ChatID, msgRequest.Content)

		newMessage := &models.Message{
			ChatID:   msgRequest.ChatID,
			SenderID: user.ID,
			Content:  msgRequest.Content,
		}

		err = h.messageRepo.Create(newMessage)
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

		h.broadcast <- messageResponse
	}

	return nil
}

func (c *Client) writePump() {
	defer func() {
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			err := c.conn.WriteJSON(message)
			if err != nil {
				log.Printf("Error sending message to user %d: %v", c.uid, err)
				return
			}
		}
	}
}
