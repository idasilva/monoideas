package modules

import (
	"testing"

	"github.com/idasilva/aws-serverless/luffy/services/app/modules/version"
	"github.com/stretchr/testify/assert"
)

func TestApp(t *testing.T) {

	assert := assert.New(t)

	app := Application()

	version.Init(app)

	assert.NotNil(app.String())
}
