package version

import (
	"github.com/gin-gonic/gin"
	"github.com/idasilva/aws-serverless/luffy-api/api"
	"net/http"
)

func Init(api *api.API) {
	api.Routes(func(c *gin.Context) {
		c.JSON(http.StatusOK, "List Of V1 Users")
	})
}
