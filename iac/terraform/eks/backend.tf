terraform {
  backend "s3" {
    bucket = "terraform-artfacts-idasilva"
    key    = "eks"
    region = "sa-east-1"
  }
}