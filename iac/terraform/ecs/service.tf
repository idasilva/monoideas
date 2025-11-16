# Define the ECS task definition for the service
resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "my-ecs-task"
  network_mode             = "awsvpc"
  execution_role_arn       = "arn:aws:iam::560978416398:role/ecsTaskExecutionRole"
  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = "dockergs"
      image     = "strm/helloworld-http"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "ecs_service" {
  name            = "my-ecs-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count   = 1

  network_configuration {
    subnets = [
      "subnet-018f1b1ae473d0509",
      "subnet-01f48848dee6d26f9",
      "subnet-06d84fa608a9b2b9f"
    ]
    security_groups = [aws_security_group.main.id]
    assign_public_ip = true
  }

  force_new_deployment = true
  triggers = {
    redeployment = timestamp()
  }

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 100
  }
}
