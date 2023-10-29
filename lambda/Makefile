#!/usr/bin/make

build-ExemploFunction:
	GOOS=linux GOARCH=arm64 go build -ldflags="-s -w" -tags lambda.norpc -o ${ARTIFACTS_DIR}/bootstrap main.go