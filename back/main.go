package main

import (
	"github.com/KimiaMontazeri/heppegram/back/db"
	"github.com/KimiaMontazeri/heppegram/back/handlers"
	middle "github.com/KimiaMontazeri/heppegram/back/middleware"
	"github.com/KimiaMontazeri/heppegram/back/repository/gorm"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"net/http"
	"time"
)

func main() {
	time.Sleep(5 * time.Second)
	db.Init()
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.CORS())

	e.GET("/", func(c echo.Context) error {
		log.Println("Handling the request for the root route")
		return c.String(http.StatusOK, "Hello, World!")
	})

	userRepo := gorm.NewUserRepo(db.DB)
	chatRepo := gorm.NewChatRepo(db.DB)
	messageRepo := gorm.NewMessageRepo(db.DB)
	userHandler := handlers.NewUserHandler(userRepo)
	chatHandler := handlers.NewChatHandler(chatRepo, userRepo, messageRepo)

	// User Handlers
	e.POST("/api/register", userHandler.Register)
	e.POST("/api/login", userHandler.Login)
	e.GET("/api/users", userHandler.SearchUsers)
	e.GET("/api/users/:username", userHandler.GetUser, middle.JWTAuthentication)
	e.PATCH("/api/users/:username", userHandler.UpdateUser, middle.JWTAuthentication)
	e.DELETE("/api/users/:username", userHandler.DeleteUser, middle.JWTAuthentication)

	// Chat Handlers
	e.POST("/api/chats", chatHandler.CreateChat, middle.JWTAuthentication)
	e.GET("/api/chats", chatHandler.GetChats, middle.JWTAuthentication)
	e.GET("/api/chats/:chat_id", chatHandler.GetChat)
	e.DELETE("/api/chats/:chat_id", chatHandler.DeleteChat)
	e.DELETE("/api/chats/:chat_id/messages/:message_id", chatHandler.DeleteMessage)

	log.Println("Starting Echo server on port 8080...")
	e.Logger.Fatal(e.Start(":8080"))
}
