### Exemplo


### Local Dev

```bash
sam build --template template.yaml
sam local invoke -e ./events/exemplo.json -l logfile.txt --region sa-east-1
```

### References

- https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchlogs.html
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html
