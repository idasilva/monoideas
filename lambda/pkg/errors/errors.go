package errors

import "github.com/idasilva/aws-serverless/lambda/pkg/common"


type exemploError struct {
	Code    interface{} `json:"code"`
	Message string      `json:"message"`
	Err     error       `json:"-"`
	ErrMsg  string      `json:"error"`
}

// Error returns the formatted error
func (b exemploError) Error() string {
	return common.JSON(b)
}

// String returns the string representation of the error.
// Alias for Error to satisfy the stringer interface.
func (b exemploError) String() string {
	return b.Error()
}

// NewExemplo constructs and returns the built error
func NewExemplo(code, message string, err error) error {
	return &exemploError{code, message, err, err.Error()}
}
