
data "archive_file" "python_lambda_package" {
  type = "zip"
  source_file = "${path.module}/code/lambda_function.py"
  output_path = "mqlambdademo.zip"
}

resource "aws_lambda_function" "mq_lambda_demo_function" {
    function_name = "mq-lambda-demo"
    
    filename      = "mqlambdademo.zip"
    source_code_hash = data.archive_file.python_lambda_package.output_base64sha256
    role          = aws_iam_role.lambda_role.arn
    runtime       = "python3.9"
    handler       = "lambda_function.lambda_handler"
    timeout       = 10
}

data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-demo-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_iam_policy_attachment" "lambda_mq_full_access" {
  name       = "lambda-mq-full-access"
  roles      = [aws_iam_role.lambda_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonMQFullAccess"
}

resource "aws_iam_policy_attachment" "lambda_secrets_manager_full_access" {
  name       = "lambda-secrets-manager-full-access"
  roles      = [aws_iam_role.lambda_role.name]
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}

resource "aws_lambda_event_source_mapping" "source_mapping_demo" {
  batch_size       = 1
  event_source_arn = aws_mq_broker.mq_demo.arn
  enabled          = true
  function_name    = aws_lambda_function.mq_lambda_demo_function.arn
  queues           = ["demo-queue"]

  source_access_configuration {
    type = "VIRTUAL_HOST"
    uri  = "/"
  }

  source_access_configuration {
    type = "BASIC_AUTH"
    uri  = "arn:aws:secretsmanager:sa-east-1:x:secret:mq-demo-xW4uRW"
  }
}


resource "aws_mq_broker" "mq_demo" {
  broker_name = "mq-demo"

  engine_type        = "RabbitMQ"
  engine_version     = "3.11.16"
  host_instance_type = "mq.t3.micro"
  subnet_ids = ["subnet-059217299d11646ca"]
  publicly_accessible = true

  user {
    username = "idasilva"
    password = "C61aW'#6By.f"
  }
}