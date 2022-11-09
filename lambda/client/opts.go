package client

import (
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go/aws/credentials"
	v4 "github.com/aws/aws-sdk-go/aws/signer/v4"
)

//Option defines request options, like request modifiers and which host to target
type Option func(c *contextRequest)

type contextRequest struct {
	req             *http.Request
	auth            *v4.Signer
	headers         map[string]string
	urlParameters   []interface{}
	queryParameters map[string]string
	service         string
	region          string
	method          string
	url             string
	requestID string

}

// WithHTTPHeaders is an Option to set global HTTP headers for all requests
func WithHTTPHeaders(headers map[string]string) Option {
	return func(c *contextRequest) {
		c.headers = headers
	}
}

// WithQueryParameters applies query parameters to the request
func WithQueryParameters(queryParameters map[string]string) Option {
	return func(c *contextRequest) {
		if len(c.queryParameters) == 0 {
			c.queryParameters = queryParameters
			return
		}

		for key, value := range queryParameters {
			c.queryParameters[key] = value
		}
	}
}

// WithService get credentials from environment variables and create the Signature Version 4 signer
func WithService(service string) Option {
	return func(c *contextRequest) {
		c.service = service
	}
}

// WithRegion get credentials from environment variables and create the Signature Version 4 signer
func WithRegion(region string) Option {
	return func(c *contextRequest) {
		c.region = region
	}
}

// WithMethod is an Option to set service's method. Default value is POST
func WithMethod(method string) Option {
	return func(c *contextRequest) {
		c.method = method
	}
}

// WithAuth get credentials from environment variables and create the Signature Version 4 signer
func WithAuth(creds *credentials.Credentials) Option {
	return func(c *contextRequest) {
		c.auth = v4.NewSigner(creds)
	}
}

// WithURLParameters is an Option to set url parameters
func WithURLParameters(urlParameters []interface{}) Option {
	return func(c *contextRequest) {
		c.urlParameters = urlParameters
	}
}

func newContextRequest(url string) *contextRequest {
	return &contextRequest{
		url: url,
	}
}

// NewDefaultOptions returns a default options configuration
func NewDefaultOptions() []Option {
	var opts []Option
	opts = append(opts, WithRegion(os.Getenv("DEFAULT_AWS_REGION")))
	return opts
}
