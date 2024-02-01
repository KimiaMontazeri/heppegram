package main

import (
	"github.com/KimiaMontazeri/heppegram/back/db"
	"github.com/KimiaMontazeri/heppegram/back/handlers"
	middle "github.com/KimiaMontazeri/heppegram/back/middleware"
	"github.com/KimiaMontazeri/heppegram/back/repository/gorm"
	"github.com/labstack/echo-contrib/echoprometheus"
	"github.com/labstack/echo-contrib/jaegertracing"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"io"
	"log"
	"net/http"
	"time"
)

func main() {
	time.Sleep(5 * time.Second)
	db.Init()
	e := echo.New()

	c := jaegertracing.New(e, nil)
	defer func(c io.Closer) {
		err := c.Close()
		if err != nil {
			log.Printf("Failed to close tracer: %v\n", err)
		}
	}(c)

	e.Use(middleware.Logger())
	e.Use(middleware.CSRF())
	e.Use(middleware.CORS())
	e.Use(echoprometheus.NewMiddleware("heppegram"))

	e.GET("/metrics", echoprometheus.NewHandler())

	e.GET("/", func(c echo.Context) error {
		log.Println("Handling the request for the root route")
		return c.String(http.StatusOK, "Hello, World!")
	})

	userRepo := gorm.NewUserRepo(db.DB)
	chatRepo := gorm.NewChatRepo(db.DB)
	messageRepo := gorm.NewMessageRepo(db.DB)
	userHandler := handlers.NewUserHandler(userRepo)
	chatHandler := handlers.NewChatHandler(chatRepo, userRepo, messageRepo)

	api := e.Group("/api")
	user := api.Group("/user")
	users := api.Group("/users")

	// User Handlers
	user.POST("/register", userHandler.Register)
	user.POST("/login", userHandler.Login)

	// Users Handlers
	users.GET("", userHandler.SearchUsers)
	users.GET("/:username", userHandler.GetUser, middle.JWTAuthentication)
	users.PATCH("/:username", userHandler.UpdateUser, middle.JWTAuthentication)
	users.DELETE("/:username", userHandler.DeleteUser, middle.JWTAuthentication)

	// Chat Handlers
	chat := api.Group("/chats")
	chat.POST("", chatHandler.CreateChat, middle.JWTAuthentication)
	chat.GET("", chatHandler.GetChats, middle.JWTAuthentication)
	chat.GET("/:chat_id", chatHandler.GetChat, middle.JWTAuthentication)
	chat.DELETE("/:chat_id", chatHandler.DeleteChat, middle.JWTAuthentication)
	chat.DELETE("/:chat_id/messages/:message_id", chatHandler.DeleteMessage, middle.JWTAuthentication)

	ws := e.Group("/ws")
	ws.GET("", chatHandler.HandleWebSocket, middle.JWTAuthentication)

	log.Println("Starting Echo server on port 8080...")
	e.Logger.Fatal(e.Start(":8080"))
}
