package client

import (
	"net/http"
	"os"
	"testing"

	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/stretchr/testify/assert"
)

func TestOptions(t *testing.T) {
	options := []Option{
		WithService("api-execute"),
		WithMethod(http.MethodPost),
		WithHTTPHeaders(map[string]string{
			"Content-Type": "application/json",
			"X-Event":      "event",
		}),
		WithAuth(&credentials.Credentials{}),
		WithRegion("sa-east-1"),
	}

	assertion := assert.New(t)

	ctx := newContextRequest("https://exemplo/v2")
	for _, o := range options {
		o(ctx)
	}
	assertion.Equal("api-execute", ctx.service)
	assertion.Equal("sa-east-1", ctx.region)
}

func TestNewDefaultOptions(t *testing.T) {
	_ = os.Setenv("DEFAULT_AWS_REGION", "sa-east-1")
	assertion := assert.New(t)

	ctx := newContextRequest("https://exemplo/v2")
	options := NewDefaultOptions()
	for _, o := range options {
		o(ctx)
	}
	assertion.Equal("execute-api", ctx.service)
	assertion.Equal("sa-east-1", ctx.region)
}
