package client

import "context"

// Service is an interface of client
type Service interface {
	Do(ctx context.Context, request interface{}, response interface{}) (int, error)
}
