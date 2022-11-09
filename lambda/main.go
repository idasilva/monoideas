package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/lambdacontext"
	"github.com/idasilva/aws-serverless/lambda/app/exemplo"
	"github.com/idasilva/aws-serverless/lambda/pkg/common"
	"github.com/idasilva/aws-serverless/lambda/pkg/types"
	"log"
)

// Resource represents an AWS resource.
type Resource interface {
	handler(ctx context.Context, event *types.Event) (*types.Event,error)
}

// Manager handler execution context of LAMBDA
type Manager struct {
	exemplo.Exemplo
}

/*handler
Invoke lambda function local ./events/exemplo.json, to do this use SAM.
*/
func (m *Manager) handler(ctx context.Context, event *types.Event) (*types.Event,error) {
	fmt.Sprintf("context: [data=%v]", common.JSON(event))

	_, err := m.POST(ctx, event.Request, &event.Response)
	if err != nil{
		return nil,err
	}

	log.Printf("finished: [data=%v]", event)

	return  event, nil
}

func main() {
	d := Manager{}
	lambda.Start(func(ctx context.Context, event *types.Event) (*types.Event,error){
		lc, _ := lambdacontext.FromContext(ctx)
		fmt.Printf("[lambda-request-id=%s] ", lc.AwsRequestID)
		return d.handler(ctx, event)
	})
}
