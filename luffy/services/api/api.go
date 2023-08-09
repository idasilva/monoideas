package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

type API struct {
	mux     *gin.Engine
	context *Context
}

func (a *API) Server() error {
	a.context.handlers(a)
	fmt.Println(a.String())
	return a.mux.Run()
}

func (a *API) Handlers(loadPaths func() []Routes) {
	a.context.Add(loadPaths)
}

func (a *API) String() string {
	return `
  _   _   _ ___ _____   __  ___ ___ _____   _____ ___ ___ ___ 
 | | | | | | __| __\ \ / / / __| __| _ \ \ / /_ _/ __| __/ __|
 | |_| |_| | _|| _| \ V /  \__ \ _||   /\ V / | | (__| _|\__ \
 |____\___/|_| |_|   |_|   |___/___|_|_\ \_/ |___\___|___|___/

`

}

func New() *API {
	return &API{
		mux:     gin.Default(),
		context: NewContext(),
	}

}
