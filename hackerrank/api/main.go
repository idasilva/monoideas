package main

import (
	"fmt"
	"net/http"
)

type middleware struct {
	handler http.Handler
}

func (m *middleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Middleware")
	m.handler.ServeHTTP(w, r)
}

func main() {

	// Create a Server Mux
	// Create a handler - Retorn all the users on database
	// Create a handler - retorns all the featuares available on the evns

	var mux = http.NewServeMux()

	mux.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {

	})

	mux.HandleFunc("/features", func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("get features from database")

		fmt.Println("return features from database")

	})

	var m = &middleware{
		handler: mux,
	}
	fmt.Println("Start app the API")

	http.ListenAndServe(":8080", m)

}
