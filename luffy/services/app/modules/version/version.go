package version

import (
	"github.com/gin-gonic/gin"
	mux "github.com/idasilva/aws-serverless/luffy/services/api"
	"net/http"
)

var version = "/v1"

func Init(api *mux.API) {
	api.Handlers(func() []mux.Routes {
		return []mux.Routes{
			{
				Method:   http.MethodGet,
				Endpoint: "/version",
				Name:     "luffy versioning",
				Version:  version,
				Handler:  handlerAppVersion,
			},
		}
	})
}

func handlerAppVersion(c *gin.Context) {

	c.JSON(http.StatusOK, "List Of V1 Users")
}
