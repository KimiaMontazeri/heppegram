package db

import (
	"fmt"
	"github.com/KimiaMontazeri/heppegram/back/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var DB *gorm.DB

func Init() {
	var err error
	dsn := fmt.Sprintf(
		"host=%s user=%s dbname=%s sslmode=disable password=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASSWORD"),
	)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}
	fmt.Println("Database connected")

	err = DB.AutoMigrate(&models.User{}, &models.Contact{}, &models.Chat{}, &models.Message{})
	if err != nil {
		log.Fatal("Failed to migrate database!", err)
	}
	fmt.Println("Database Migrated")
}
