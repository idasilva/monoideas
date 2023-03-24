import pandas as pd
import io
import gzip
import json
import zlib, json, base64
from io import BytesIO


def lambda_handler(event, context):
    # prepared_data = []
    # i = 0
    # for i in event["Items"]:
    #     try:
    #         json_object = json.loads(i)
    #         prepared_data.append(json_object)
    #     except ValueError as e:
    #         continue
        
    # if (len(prepared_data) == 0):
    #     return {
    #         "statusCode": 500,
    #         "datas": prepared_data,
    #         "body": json.dumps({
    #             "len": len(prepared_data),
    #         }),
    #     }   
    
            
    # print("data insignts2 - :",prepared_data[0])

    df = pd.DataFrame(event["Items"])

    # df = pd.read_json(json.dumps(datas), orient ='index')

    df.fillna('', inplace=True)
    data = df.to_dict('records')
    # print("data process - sample data:",data[0])

    for index, value in enumerate(data):
        data[index]["actor_id"] =  data[index]["actor"]['id']
        data[index]["actor_login"] =  data[index]["actor"]['login']
        data[index]["actor_display_login"] =  data[index]["actor"]['display_login']
        data[index]["actor_gravatar_id"] =  data[index]["actor"]['gravatar_id']
        data[index]["actor_url"] =  data[index]["actor"]['url']
        data[index]["actor_avatar_url"] =  data[index]["actor"]['avatar_url']
        data[index]["repo_id"] =   data[index]["repo"]['id']
        data[index]["repo_name"] =   data[index]["repo"]['name']
        data[index]["repo_url"] =   data[index]["repo"]['url']
        data[index]["push_distinct_size"] = None
        data[index]["push_size"] = None
        data[index]["number"] = None
        data[index]["action"] = None
        if "org" in  data[index]:
            if "id" in data[index]["org"]:
                data[index]["org_id"] =  data[index]["org"]['id']
                data[index]["org_login"] =  data[index]["org"]['login']
                data[index]["org_gravatar_id"] =  data[index]["org"]['gravatar_id']
                data[index]["org_url"] =  data[index]["org"]['url']
                data[index]["org_avatar_url"] =  data[index]["org"]['avatar_url']
        if "payload" in  data[index]:
            if "action" in data[index]["payload"]:
                data[index]["action"] =  data[index]["payload"]["action"]
            if "PushEvent" in data[index]["type"]:
                 data[index]["push_distinct_size"] =  data[index]["payload"]["distinct_size"]
                 data[index]["push_size"] =  data[index]["payload"]["size"]
                 
            if "IssuesEvent" in data[index]["type"]:
                 data[index]["number"] =  data[index]["payload"]["issue"]["number"]
                 
            if "IssueCommentEvent" in data[index]["type"]:
                 data[index]["number"] =  data[index]["payload"]["issue"]["number"]
                 
            if "PullRequestEvent" in data[index]["type"]:
                 data[index]["number"] =  data[index]["payload"]["number"]
            
            if "CommitCommentEvent" in data[index]["type"]:
                 data[index]["number"] =  data[index]["payload"]["comment"]["id"]
                 
            if "ForkEvent" in data[index]["type"]:
                data[index]["number"] =  data[index]["payload"]["forkee"]["id"]
                

            

    df = pd.DataFrame(data)

    new_df = pd.DataFrame() 
    if 'org' in df.columns:
        new_df = df[(df['org_id'] == 21003710.0) | (df['org_id'] == 13455738.0)].copy()
        new_df['created_at'] = pd.to_datetime(new_df["created_at"]).dt.date
        new_df['created_at'] =new_df["created_at"].astype(str)
        new_df['public'] = new_df['public'].astype(str)
        print("data to persist:",new_df.to_dict('records'))
    
    if 'org' in new_df.columns:
         del new_df["org"]
    
    if 'repo' in new_df.columns:
         del new_df["repo"]
        
    if 'actor' in new_df.columns:
        del new_df["actor"]
    
    if 'payload' in new_df.columns:
        del new_df["payload"]
        
    new_df.fillna('', inplace=True)
    return {
        "statusCode": 200,
        "datas": new_df.to_dict('records'),
        "body": json.dumps({
            "len": len(new_df),
     
        }),
    }