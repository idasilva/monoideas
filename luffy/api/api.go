package api

import (
	"github.com/gin-gonic/gin"
)

type API struct {
	mux    *gin.Engine
	routes *Routes
}

func (a *API) Server() error {
	a.mux.Handlers = a.routes.Route
	return a.mux.Run()
}

func (a *API) Handlers(loadPaths func() []gin.HandlerFunc) {
	a.routes.Add(loadPaths)
}

func NewContext() *API {
	return &API{
		mux:    gin.Default(),
		routes: NewRoutes(),
	}

}
