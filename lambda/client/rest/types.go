package rest

import (
	"bytes"
	"context"
	"net/http"
)

// ResponseParse  parse response
type ResponseParse interface {
	Parse(ctx context.Context,response interface{}, r *http.Response) error
}


// RequestParse parse request
type RequestParse interface {
	Parse(ctx context.Context,request interface{}) (*bytes.Buffer, error)
}
