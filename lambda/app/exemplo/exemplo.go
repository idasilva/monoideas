package exemplo

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/idasilva/aws-serverless/lambda/client"
	"github.com/idasilva/aws-serverless/lambda/pkg/types"
	"net/http"
)

var (
	url = "url/exemplo"
)

// ProxyResource represents an integration resource
type ProxyResource interface {
	POST(context context.Context, request interface{}, response interface{}) (int,error)
}

// Exemplo
type Exemplo struct {
	cli client.Service
}

// POST
func (e *Exemplo) POST(ctx context.Context,request interface{}, response interface{})  (int,error) {
	return e.cli.Do(ctx, request,response)
}

// New returns a new taskToken resolver
func New(ctx context.Context,event *types.Event) (*Exemplo, error) {
	opts := client.NewDefaultOptions()

	opts = append(opts,
		client.WithMethod(http.MethodPost),
		client.WithAuth(credentials.NewEnvCredentials()),
		client.WithHTTPHeaders(map[string]string{
			"Content-Type": "application/json",
			"X-Event":   event.Event,
		}),
	)

	cli, err := client.NewClientWithOpts( url, opts...)
	if err != nil {
		return nil, err
	}

	fmt.Printf("client created")
	return &Exemplo{
		cli: cli,
	}, nil
}
