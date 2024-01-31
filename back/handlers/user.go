package handlers

import (
	"github.com/KimiaMontazeri/heppegram/back/models"
	"github.com/KimiaMontazeri/heppegram/back/repository"
	"github.com/KimiaMontazeri/heppegram/back/utils"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
)

type UserHandler struct {
	UserRepo repository.User
}

func NewUserHandler(userRepo repository.User) *UserHandler {
	return &UserHandler{UserRepo: userRepo}
}

type UserRegisterDTO struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Phone     string `json:"phone"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}

type UserUpdateDTO struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`
	Image     string `json:"image"`
	Bio       string `json:"bio"`
}

type UserLoginDTO struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *UserHandler) Register(c echo.Context) error {
	userRegisterDTO := new(UserRegisterDTO)
	if err := c.Bind(userRegisterDTO); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	user := models.User{
		Firstname: userRegisterDTO.Firstname,
		Lastname:  userRegisterDTO.Lastname,
		Phone:     userRegisterDTO.Phone,
		Username:  userRegisterDTO.Username,
		Password:  utils.HashPassword(userRegisterDTO.Password),
	}

	existingUser, err := h.UserRepo.FindByUsername(user.Username)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	if existingUser != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Username already in use")
	}

	if err := h.UserRepo.Create(&user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, user)
}

func (h *UserHandler) Login(c echo.Context) error {
	userLoginDTO := new(UserLoginDTO)
	if err := c.Bind(userLoginDTO); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	user, err := h.UserRepo.FindByUsername(userLoginDTO.Username)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	if user == nil || !utils.CheckPasswordHash(userLoginDTO.Password, user.Password) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid username or password")
	}

	token, err := utils.GenerateJWT(user.Username)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate token")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token": token,
	})
}

func (h *UserHandler) GetUser(c echo.Context) error {
	username := c.Param("username")
	authUsername := c.Get("username")
	log.Println("Auth Username: ", authUsername)
	if authUsername != username {
		return echo.NewHTTPError(http.StatusForbidden, "Access denied")
	}

	user, err := h.UserRepo.FindByUsername(username)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	if user == nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) UpdateUser(c echo.Context) error {
	username := c.Param("username")
	authUsername := c.Get("username")
	if authUsername != username {
		return echo.NewHTTPError(http.StatusForbidden, "Access denied")
	}

	userUpdateDTO := new(UserUpdateDTO)
	if err := c.Bind(userUpdateDTO); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Error binding user data")
	}

	user, err := h.UserRepo.FindByUsername(username)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error fetching user")
	}
	if user == nil {
		return echo.NewHTTPError(http.StatusNotFound, "User not found")
	}

	user.Firstname = userUpdateDTO.Firstname
	user.Lastname = userUpdateDTO.Lastname
	user.Phone = userUpdateDTO.Phone
	if userUpdateDTO.Password != "" {
		user.Password = utils.HashPassword(userUpdateDTO.Password)
	}
	user.Image = userUpdateDTO.Image
	user.Bio = userUpdateDTO.Bio

	if err := h.UserRepo.Update(user); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error updating user")
	}

	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) DeleteUser(c echo.Context) error {
	username := c.Param("username")
	authUsername := c.Get("username")
	if authUsername != username {
		return echo.NewHTTPError(http.StatusForbidden, "Access denied")
	}

	if err := h.UserRepo.Delete(username); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error deleting user")
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *UserHandler) SearchUsers(c echo.Context) error {
	keyword := c.QueryParam("keyword")
	if keyword == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Keyword is required")
	}

	users, err := h.UserRepo.FindByKeyWord(keyword)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error searching for users")
	}

	return c.JSON(http.StatusOK, users)
}
