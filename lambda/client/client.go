package client

import (
	"context"
	"fmt"
	"github.com/idasilva/aws-serverless/lambda/client/rest"
	"github.com/idasilva/aws-serverless/lambda/pkg/errors"
	"log"

	"net"
	"net/http"
	"time"

	"github.com/aws/aws-xray-sdk-go/xray"
)

// Client represents a http client with context
type Client struct {
	requestParser  rest.RequestParse
	contextRequest *contextRequest
	http           *http.Client
	responseParser rest.ResponseParse
}

// Do a request
func (c *Client) Do(ctx context.Context, request interface{}, response interface{}) (int, error) {
	log.Printf("sending a new request")
	err := c.createRequest(ctx,request)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	resp, err := c.http.Do(c.contextRequest.req)
	if err != nil {
		if e, ok := err.(net.Error); ok && e.Timeout() {
			return http.StatusGatewayTimeout, errors.NewExemplo("errTimeout", "timeout doing the request", err)
		}
		return http.StatusInternalServerError, errors.NewExemplo("errSendRequest",
			"failed to send request",
			err)
	}

	defer func() {
		_ = resp.Body.Close()
	}()

	err = c.responseParser.Parse(ctx,response, resp)
	if err != nil {
		return http.StatusInternalServerError, errors.NewExemplo("errParseResponse",
			"failed to send request",
			err)
	}

	log.Printf( "finishing request")
	return resp.StatusCode, nil
}

func (c *Client) createRequest(ctx context.Context, r interface{}) error {
	buffer, err := c.requestParser.Parse(ctx,r)
	if err != nil {
		return errors.NewExemplo("errParserRequest",
			"failed to parse request",
			err)
	}


	request, err := http.NewRequestWithContext(ctx, c.contextRequest.method, fmt.Sprintf(
		c.contextRequest.url, c.contextRequest.urlParameters...), buffer)
	if err != nil {
		return errors.NewExemplo("errNewRequest",
			"failed to create new request",
			err)
	}

	c.contextRequest.req = request

	for k, v := range c.contextRequest.headers {
		c.contextRequest.req.Header.Set(k, v)
	}

	fmt.Printf("url with parameters: %s", c.contextRequest.req.URL.String())

	if len(c.contextRequest.queryParameters) > 0 {
		q := c.contextRequest.req.URL.Query()
		for k, v := range c.contextRequest.queryParameters {
			q.Add(k, v)
		}
		c.contextRequest.req.URL.RawQuery = q.Encode()
	}

	_, err = c.contextRequest.auth.Sign(c.contextRequest.req,
		nil,
		c.contextRequest.service,
		c.contextRequest.region,
		time.Now(),
	)

	if err != nil {
		return errors.NewExemplo("errSignRequest",
			"failed to sign request",
			err)
	}

	return nil
}

// NewClientWithOpts returns a new client
func NewClientWithOpts(url string, opts ...Option) (Service, error) {
	ctxReq := newContextRequest(url)

	for _, opt := range opts {
		opt(ctxReq)
	}

	c := &Client{
		requestParser:  rest.NewRequestParser(ctxReq.requestID),
		responseParser: rest.NewResponseParser(),
		http:           xray.Client(&http.Client{}),
		contextRequest: ctxReq,
	}

	return c, nil
}
