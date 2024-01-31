package main

import (
	"github.com/KimiaMontazeri/heppegram/back/db"
	"github.com/KimiaMontazeri/heppegram/back/handlers"
	"github.com/KimiaMontazeri/heppegram/back/middleware"
	"github.com/KimiaMontazeri/heppegram/back/repository/gorm"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"time"
)

func main() {
	time.Sleep(5 * time.Second)
	db.Init()
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		log.Println("Handling the request for the root route")
		return c.String(http.StatusOK, "Hello, World!")
	})

	userRepo := gorm.NewUserRepo(db.DB)
	userHandler := handlers.NewUserHandler(userRepo)

	// User Handlers
	e.POST("/api/register", userHandler.Register)
	e.POST("/api/login", userHandler.Login)
	e.GET("/api/users", userHandler.SearchUsers)
	e.GET("/api/users/:username", userHandler.GetUser, middleware.JWTAuthentication)
	e.PATCH("/api/users/:username", userHandler.UpdateUser, middleware.JWTAuthentication)
	e.DELETE("/api/users/:username", userHandler.DeleteUser, middleware.JWTAuthentication)

	log.Println("Starting Echo server on port 8080...")
	e.Logger.Fatal(e.Start(":8080"))
}
