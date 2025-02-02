terraform {
  backend "s3" {
    bucket = "terraform-artfacts-idasilva"
    key    = "lambda"
    region = "sa-east-1"
  }
}
