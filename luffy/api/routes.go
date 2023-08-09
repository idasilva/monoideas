package api

import "github.com/gin-gonic/gin"

type Routes struct {
	Name  string            `json:"name"`
	Route []gin.HandlerFunc `json:"route"`
}

func (r *Routes) Add(loadPaths func() []gin.HandlerFunc) {
	for _, handler := range loadPaths() {
		r.Route = append(r.Route, handler)
	}
}

func NewRoutes() *Routes {
	return &Routes{}
}
