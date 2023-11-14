import elasticsearch
from dateutil.parser import parse
import pandas as pd
import json
import xml.etree.ElementTree as ET

es = Elasticsearch(["IP/PORT"], http_auth=("USER", "NAME",), timeout=60,)

pandas_to_frame = []

results = elasticsearch.helpers.scan(client=es,index="index-*",
         query={ 
             "query": {
               "query_string": {
                   "default_field": "message",
#                 }
                    "query": "fields.environment:\"production\" && message: \"response\" && fields.response: \"response error\" && @timestamp:[2023-09-17T21:00:00.000Z TO 2023-09-18T23:59:59.000Z]"
                 }
           },
         "_source": ["fields.environment","@timestamp", "message"]},
         raise_on_error=False,
)   


for hit in results: 
    req = json.loads(hit['_source']['fields']['request'])
    resp = json.loads(hit['_source']['fields']['response'])
    timestamp = parse(hit['_source']['@timestamp'])
   
    digital_request = {
                 "date":timestamp.strftime('%Y-%m-%d'),
            }
    pandas_to_frame.append(digital_request)

print(len(pandas_to_frame))

df = pd.DataFrame(pandas_to_frame)


df.head(20)

df.dropna(inplace = True)

df = pd.DataFrame(pandas_to_frame)

df.head(100)

df = pd.DataFrame(pandas_to_frame)
new_df = df.dropna()
new_df.to_csv(r'./result.csv', index = False, header=True,sep=';')

