package rest

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/idasilva/aws-serverless/lambda/pkg/common"
	"io/ioutil"

	"net/http"
)

type requestParser struct {
	requestID string
}

// Parse return request body
func (rp *requestParser) Parse(ctx context.Context, request interface{}) (*bytes.Buffer, error) {
	b, err := json.Marshal(request)
	if err != nil {
		return nil, err
	}

	return bytes.NewBuffer(b), nil
}

// NewRequestParser returns a RequestParse
func NewRequestParser(requestID string) RequestParse {
	return &requestParser{
		requestID: requestID,
	}
}

type responseParser struct {
	buf bytes.Buffer
}

// Parse return response body
func (rp *responseParser) Parse(ctx context.Context, response interface{}, r *http.Response) error {
	body := ioutil.NopCloser(r.Body)

	content, err := ioutil.ReadAll(body)
	if err != nil {
		return err
	}

	fmt.Printf("call response: [data=%v]", common.JSON(string(content)))

	return json.NewDecoder(bytes.NewReader(content)).Decode(response)
}

// NewResponseParser returns a ResponseParse
func NewResponseParser() ResponseParse {
	return &responseParser{
		buf: bytes.Buffer{},
	}
}
