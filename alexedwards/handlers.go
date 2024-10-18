package main

import (
	"log"
	"net/http"
	"time"
)

// anything in Go can be a handler so long as it satisfies the http.Handler interface,
type Handler interface {
	ServeHTTP(http.ResponseWriter, *http.Request)
}

type timeHandler struct {
	format string
}

func (th timeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	tm := time.Now().Format(th.format)
	w.Write([]byte("The time is: " + tm))

}

// Processing HTTP requests with Go is primarily about two things: handlers and servemuxes.
func main() {

	mux := http.NewServeMux()

	rh := http.RedirectHandler("http://example.org", 307)

	mux.Handle("/hello", rh)

	mux.Handle("time", timeHandler{format: time.RFC1123})

	log.Print("Listening...")

	http.ListenAndServe(":3000", mux)

}
