package main

import (
	"github.com/KimiaMontazeri/heppegram/back/db"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
)

func main() {
	db.Init()

	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		log.Println("Handling the request for the root route")
		return c.String(http.StatusOK, "Hello, World!")
	})

	log.Println("Starting Echo server on port 8080...")
	e.Logger.Fatal(e.Start(":8080"))
}
