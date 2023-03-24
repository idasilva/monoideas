import json
import boto3
import pymysql
import os


def lambda_handler(event, context):

    try:
        conn = pymysql.connect(host='gh-archive-poc.cpupsevu0yrz.sa-east-1.rds.amazonaws.com',
                               user='idasilva', passwd='Gharchivepoc',     port=3306, database='gh_archive')
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO github_events (
            id,
            type,
            public,
            created_at,
            actor_id,
            actor_login,
            actor_display_login,
            actor_gravatar_id,
            actor_url,
            actor_avatar_url,
            repo_id,
            repo_name,
            repo_url,
            org_id,
            org_login,
            org_gravatar_id,
            org_url,
            org_avatar_url,
            action,
            number,
            push_distinct_size,
            push_size
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (
                event['id'],
                event['type'],
                event['public'],
                event['created_at'],
                event['actor_id'],
                event['actor_login'],
                event['actor_display_login'],
                event['actor_gravatar_id'],
                event['actor_url'],
                event['actor_avatar_url'],
                event['repo_id'],
                event['repo_name'],
                event['repo_url'],
                event['org_id'],
                event['org_login'],
                event['org_gravatar_id'],
                event['org_url'],
                event['org_avatar_url'],
                event['action'],
                event['number'],
                event['push_distinct_size'],
                event['push_size'],
            )
        )

        conn.commit()
        cur.close()
        conn.close()

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": "data NOK",
                "error": json.dumps(e, default=str),
            })
        }

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "data OK"
        }),
    }
