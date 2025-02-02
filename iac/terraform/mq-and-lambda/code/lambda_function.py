import json
import boto3
    
def lambda_handler(event, context):
    print(json.dumps(event))
    return {
        'statusCode' : 200
    }