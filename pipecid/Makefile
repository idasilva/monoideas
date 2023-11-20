
.DEFAULT_GOAL := help

.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build-arm64:
	GOOS=linux GOARCH=arm64 go build -o dist/pipecid_linux-amd64

clean-artfacts:
	@rm -rf $(DIST_DIR)
