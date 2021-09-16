package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	a "github.com/idasilva/goserverless/lambda/aws"
	"github.com/idasilva/goserverless/lambda/types"
	"github.com/sirupsen/logrus"
	"net/http"
)

func handler(r events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	event := types.Event{}

	logrus.Infof("log request info... %v", r.Body)

	err := json.Unmarshal([]byte(r.Body), &event)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: http.StatusUnprocessableEntity,
			Body:       errors.New(fmt.Sprintf("parse request fail.. %v", err.Error())).Error(),
		}, err
	}

	d := a.NewDynamoDB()

	err = d.Execute(event)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 422,
			Body:       errors.New(fmt.Sprintf("execute operations on dynamo fail.. %v", err.Error())).Error(),
		}, err
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "request complete with success !!....",
	}, nil

}

func main() {
	lambda.Start(handler)
}
