package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/idasilva/goserverless/lambda/types"
)



func handler(r events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	event := types.Event{}

	err := json.Unmarshal([]byte(r.Body), &event)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 422,
			Body:     fmt.Sprintf( "Something went wrong :(  %v",err.Error() ),
		},err
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
		}, err
	}

	var eventError error

	switch event.Operation {
	case "create":
		_, err := dndb.PutItem(&dynamodb.PutItemInput{
			Item:      attribute,
			TableName: aws.String(event.TableName),
		})
		if err != nil {
			eventError = err
		}
		break
	case "read":
		_ , err := dndb.GetItem(&dynamodb.GetItemInput{
			Key: map[string]*dynamodb.AttributeValue{
				"ID": {
					N: aws.String(event.Payload.Item.ID),
				},
				"Nome": {
					S: aws.String(event.Payload.Item.Name),
				},
			},
			TableName: aws.String(event.TableName),
		})

		if err != nil {
			eventError = err
		}
		break
	case "update":
		_, err := dndb.UpdateItem(&dynamodb.UpdateItemInput{
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
				":r": {
					N: aws.String(event.Payload.Item.Name),
				},
			},
			TableName: aws.String(event.TableName),
			Key:map[string]*dynamodb.AttributeValue{
				"ID": {
					N: aws.String(event.Payload.Item.ID),
				},
				"Nome": {
					S: aws.String(event.Payload.Item.Name),
				},
			},
			ReturnValues:     aws.String("UPDATED_NEW"),
			UpdateExpression: aws.String("set Name = :r"),
		})
		if err != nil {
			eventError = err
		}
		break
	case "delete":
		_, err := dndb.DeleteItem(&dynamodb.DeleteItemInput{
			Key: map[string]*dynamodb.AttributeValue{
				"ID": {
					N: aws.String(event.Payload.Item.ID),
				},
				"Nome": {
					S: aws.String(event.Payload.Item.Name),
				},
			},
			TableName: aws.String(event.TableName),
		})
		if err != nil{
			eventError = err
		}
		break
	case "list":
		//dynamo.scan(event.payload, callback);
		break
	case "echo":
		 fmt.Println("write a log to test lambda")
		break
	case "ping":
		fmt.Println("write a pong long")
		break
	default:
	}

	if eventError != nil {
		fmt.Println("an error occurred",eventError.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 422,
			Body:       "Something went wrong on dynamo operations :(",
		}, err
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "all right :)",
	},nil

}

func main() {
	lambda.Start(handler)
}
