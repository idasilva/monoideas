package main

import "fmt"

func write(ch chan<- int) {
	for i := 0; i < 10; i++ {
		ch <- i
		fmt.Println("escrevendo no channel")
	}

	close(ch)

}

func main() {

	ch := make(chan int, 1)
	go write(ch)

	for message := range ch {
		fmt.Println("read message from channel: %v", message)
	}

}
