package api

import (
	"github.com/gin-gonic/gin"
)

type Routes struct {
	Method   string
	Endpoint string
	Name     string
	Version  string
	Handler  gin.HandlerFunc
}

type Context struct {
	Routes []Routes `json:"route"`
}

func (c *Context) Add(loadPaths func() []Routes) {
	for _, handler := range loadPaths() {
		c.Routes = append(c.Routes, handler)
	}
}

func (c *Context) handlers(api *API) {
	for _, h := range c.Routes {
		api.mux.Group(h.Version).Handle(h.Method, h.Endpoint, h.Handler)
	}
}

func NewContext() *Context {
	return &Context{}
}
