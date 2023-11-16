FROM golang:alpine AS builder

RUN mkdir /build

ADD . /build/

WORKDIR /build

ENV GO111MODULE=on \
    CGO_ENABLED=0 \  
    GOOS=linux \
    GOARCH=amd64

RUN  go build -o  main .

FROM alpine

RUN adduser -S -D -H -h /app appuser

USER appuser

COPY --from=builder /build/main /app/

WORKDIR /app

EXPOSE 8080

CMD ["./main", "server"]