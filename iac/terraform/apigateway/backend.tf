terraform {
  backend "s3" {
    bucket = "terraform-artfacts-idasilva"
    key    = "apigateway"
    region = "sa-east-1"
  }
}

