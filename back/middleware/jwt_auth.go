package middleware

import (
	"net/http"
	"strings"

	"github.com/KimiaMontazeri/heppegram/back/utils"
	"github.com/labstack/echo/v4"
)

func JWTAuthentication(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			return c.JSON(http.StatusUnauthorized, "missing Authorization header")
		}

		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			return c.JSON(http.StatusUnauthorized, "invalid Authorization header format")
		}

		username, err := utils.ParseJWT(headerParts[1])
		if err != nil {
			return c.JSON(http.StatusUnauthorized, "invalid or expired JWT")
		}

		// Set the username in the context
		c.Set("username", username)

		return next(c)
	}
}
