resource "aws_security_group" "main" {
  name = var.name

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

resource "aws_security_group_rule" "subnet_ranges" {
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  type              = "ingress"
  description       = "Liberando trafego para a VPC"
  security_group_id = aws_security_group.main.id
  cidr_blocks       = ["0.0.0.0/0"]
}
