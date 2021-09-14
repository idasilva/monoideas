package lambda

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Event struct {
	Operation string
	TableName string
	Payload   Data
}

type Data struct {
	Item
}

type Item struct {
	ID   string
	Name string
}

func handler(context context.Context, r events.APIGatewayProxyRequest) *events.APIGatewayProxyResponse{
	event := Event{}

	err := json.Unmarshal([]byte(r.Body),event)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 422,
			Body:       "Something went wrong :(",
		}
	}

	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	dndb := dynamodb.New(sess)

	attribute, err := dynamodbattribute.MarshalMap(event)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 422,
			Body:       "Something went wrong :(",
		}
	}



	switch event.Operation {
	case "create":
		dndb.PutItem(&dynamodb.PutItemInput{
			Item:                        attribute,
			TableName:                   aws.String(event.TableName),
		})
		break;
	case "read":
		//dynamo.get(event.payload, callback);
		break;
	case "update":
		//dynamo.update(event.payload, callback);
		break;
	case "delete":
		//dynamo.delete(event.payload, callback);
		break;
	case "list":
		//dynamo.scan(event.payload, callback);
		break;
	case "echo":
		//callback(null, "Success");
		break;
	case "ping":
		//callback(null, "pong");
		break;
	default:
		//callback(`Unknown operation: ${operation}`);
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "all right :)",
	}

}

func main() {
	lambda.Start(handler)

}
