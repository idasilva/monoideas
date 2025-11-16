
resource "aws_security_group" "lb" {
  name   = format("%s-load-balancer", var.name)
  vpc_id = "vpc-09ce75627356979eb"

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }
}

resource "aws_security_group_rule" "ingress_80" {
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 80
  to_port           = 80
  description       = "Liberando trafego na porta 80"
  protocol          = "tcp"
  security_group_id = aws_security_group.lb.id
  type              = "ingress"
}

resource "aws_security_group_rule" "ingress_443" {
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 443
  to_port           = 443
  description       = "Liberando trafego na porta 443"
  protocol          = "tcp"
  security_group_id = aws_security_group.lb.id
  type              = "ingress"
}

resource "aws_lb" "main" {
  name               = format("%s-ingress", var.name)
  internal           = false
  load_balancer_type = "application"

  subnets = [
    "subnet-018f1b1ae473d0509",
    "subnet-01f48848dee6d26f9",
    "subnet-06d84fa608a9b2b9f"
  ]

  security_groups = [
    aws_security_group.lb.id
  ]

  enable_cross_zone_load_balancing = false
  enable_deletion_protection       = false
}

# resource "aws_lb_listener" "main" {
#   load_balancer_arn = aws_lb.main.arn
#   port              = "80"
#   protocol          = "HTTP"
#   default_action {
#     type = "fixed-response"
#     fixed_response {
#       content_type = "text/plain"
#       message_body = "LinuxTips"
#       status_code  = "200"
#     }
#   }
# }


# resource "aws_lb_listener" "ecs_alb_listener" {
#   load_balancer_arn = aws_lb.main.arn
#   port              = 80
#   protocol          = "HTTP"

#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.ecs_tg.arn
#   }
# }

# resource "aws_lb_target_group" "ecs_tg" {
#   name        = "ecs-target-group"
#   port        = 80
#   protocol    = "HTTP"
#   target_type = "ip"
#   vpc_id      = aws_vpc.main.id

#   health_check {
#     path = "/"
#   }
# }