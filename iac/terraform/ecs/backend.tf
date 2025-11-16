terraform {
  backend "s3" {
    bucket = "terraform-artfacts-idasilva"
    key    = "ecs"
    region = "sa-east-1"
  }
}

