import pandas as pd
import requests
import io
import gzip
import json
import zlib, json, base64
from io import BytesIO
import boto3
from tempfile import TemporaryFile
from io import BytesIO
import zlib
import zipfile
import datetime
from datetime import timedelta



base_url = ("https://data.gharchive.org/{0}-{1}.json.gz")

s3 = boto3.resource('s3')
bucket = s3.Bucket('chaitan-poc')  # CHANGE ME

def lambda_handler(event, context):
    x = datetime.datetime.now()

    date  = x.today().strftime('%Y-%m-%d')
    hour  = x.hour
    if hour != 0:
        hour = hour-1
    else:
        print("this feature needs to bee implements")
        raise Exception("this feature needs to bee implements")
        
        
    print("hour:",hour)
    print("date:",date)
    new_url =  base_url.format(date, hour)

    print("data process - new url:",new_url)

    response = requests.get(new_url)
    key = "github_events-"+str(date)+"-"+str(hour)+".json"
    

    data = gzip.decompress(response.content)
    decodedbts = data.decode('utf8')

    datas = decodedbts.splitlines()
    print("datas1",datas[1])
    print("datas2",datas[2])
    print("datas3",datas[3])

    print("datas", len(datas)) 
    prepared_data = []
    for i, j in zip(datas, range(len(datas))):
        try:
            json_object = json.loads(i)
            if j == 1:
                print("json_object",json_object["repo"])
            if "org" in json_object:
                if json_object["org"]["id"] == 21003710.0 or  json_object["org"]["id"] == 13455738.0:
                    prepared_data.append(json_object)
        except ValueError as e:
            continue
       
      
    print("prepared_data", len(prepared_data))
    print("prepared_data1", prepared_data[0]) 
    print("prepared_data2", prepared_data[1]) 
    print("prepared_data3", prepared_data[2]) 
        
            
    jsonStr = json.dumps(prepared_data)


    bucket.upload_fileobj(
        io.BytesIO(jsonStr.encode()),
        key,
        {'ContentType': "application/json", 'ContentEncoding': 'json'})
        
    return {
        "statusCode": 200,
        "body":{
            "baseUrl": new_url,
            "key":key,
            "bucket":"chaitan-poc"
        },
    }