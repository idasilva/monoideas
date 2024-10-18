package main

import "fmt"

func hello(channel chan int) {

	channel <- 1

}

func main() {

	channel := make(chan int)

	go hello(channel)

	done := <-channel
	fmt.Println(done)

}
