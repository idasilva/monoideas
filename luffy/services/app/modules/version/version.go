package version

import (
	"net/http"

	"github.com/gin-gonic/gin"
	mux "github.com/idasilva/aws-serverless/luffy/services/api"
	log "github.com/sirupsen/logrus"
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

	log.WithFields(log.Fields{
		"apiName": "version",
	}).Info("version api was called...")

	c.JSON(http.StatusOK, "version: 1")
}
