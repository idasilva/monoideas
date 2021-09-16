package aws

import (
	"github.com/aws/aws-sdk-go/aws/session"
)

//  NewSession returns a new session to interaction with aws
func NewSession() *session.Session {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))
	return sess
}
