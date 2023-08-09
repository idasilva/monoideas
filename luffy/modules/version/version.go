package version

import (
	"github.com/gin-gonic/gin"
	"github.com/idasilva/aws-serverless/luffy-api/api"
	"net/http"
)

func Init(api *api.API) {

	api.Handlers(func() []gin.HandlerFunc {

		return []gin.HandlerFunc{

			func(ctx *gin.Context) {

			},
		}

	})

	gin.Default()

	router := gin.Default()

	// version 1
	apiV1 := router.Group("/v1")

	apiV1.GET("users", func(c *gin.Context) {
		c.JSON(http.StatusOK, "List Of V1 Users")
	})
}
