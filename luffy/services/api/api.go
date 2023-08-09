package api

import (
	"github.com/gin-gonic/gin"
)

type API struct {
	mux     *gin.Engine
	context *Context
}

func (a *API) Server() error {
	a.context.handlers(a)
	return a.mux.Run()
}

func (a *API) Handlers(loadPaths func() []Routes) {
	a.context.Add(loadPaths)
}

func New() *API {
	return &API{
		mux:     gin.Default(),
		context: NewContext(),
	}

}
