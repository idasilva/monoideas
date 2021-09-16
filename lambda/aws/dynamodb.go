package aws

import (
	"errors"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/idasilva/goserverless/lambda/types"
	"github.com/sirupsen/logrus"
)

type Dynamo struct {
	dndb *dynamodb.DynamoDB
}

func (d *Dynamo) Execute(event types.Event) error {

	attribute, err := dynamodbattribute.MarshalMap(event)
	if err != nil {
		return errors.New(fmt.Sprintf("parse dynamodbattribute fail.. %v", err.Error()))
	}

	switch event.Operation {

	case "create":

		logrus.WithFields(logrus.Fields{
			"operation": event.Operation,
			"tableName": event.TableName,
			"id":        event.ID,
			"name":      event.Name,
		}).Info("entity to put on dynamodb")

		_, err := d.dndb.PutItem(&dynamodb.PutItemInput{
			Item:      attribute,
			TableName: aws.String(event.TableName),
		})

		if err != nil {
			return err
		}

		break
	case "read":
		_, err := d.dndb.GetItem(&dynamodb.GetItemInput{
			Key: map[string]*dynamodb.AttributeValue{
				"id": {
					N: aws.String(event.ID),
				},
				"name": {
					S: aws.String(event.Name),
				},
			},
			TableName: aws.String(event.TableName),
		})

		if err != nil {
			return err
		}

		break
	case "update":
		_, err := d.dndb.UpdateItem(&dynamodb.UpdateItemInput{
			ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{":r": {
				N: aws.String(event.Name),
			},
			},
			TableName: aws.String(event.TableName),
			Key: map[string]*dynamodb.AttributeValue{
				"id": {
					N: aws.String(event.ID),
				},
				"name": {
					S: aws.String(event.Name),
				},
			},
			ReturnValues:     aws.String("UPDATED_NEW"),
			UpdateExpression: aws.String("set name = :r"),
		})

		if err != nil {
			return err
		}

		break
	case "delete":
		_, err := d.dndb.DeleteItem(&dynamodb.DeleteItemInput{
			Key: map[string]*dynamodb.AttributeValue{
				"id": {
					N: aws.String(event.ID),
				},
				"name": {
					S: aws.String(event.Name),
				},
			},
			TableName: aws.String(event.TableName),
		})

		if err != nil {
			return err
		}

	}

	return nil
}

// NewDynamoDB returns a new instance of dynamodb
func NewDynamoDB() *Dynamo {
	return &Dynamo{
		dndb: dynamodb.New(NewSession()),
	}
}
