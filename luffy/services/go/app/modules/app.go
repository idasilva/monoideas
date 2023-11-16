package modules

import (
	"github.com/idasilva/aws-serverless/luffy/services/api"
	"github.com/idasilva/aws-serverless/luffy/services/app/modules/version"
)

func Application() *api.API {
	app := api.New()

	version.Init(app)

	return app
}
