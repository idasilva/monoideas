package api

import "github.com/gin-gonic/gin"

type API struct {
	engine *gin.Engine
}

func (a *API) Server() error {
	return a.engine.Run()
}

func (a *API) Routes(handlerFunc gin.HandlerFunc) {

}

func NewContext() *API {
	return &API{
		engine: gin.Default(),
	}

}
