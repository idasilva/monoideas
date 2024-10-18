package main

import (
	"fmt"
	"sync"
)

func main() {

	worker := make(chan interface{}, 5)

	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		defer wg.Done()
		for taks := 0; taks < 1000; taks++ {
			worker <- taks
		}
		close(worker)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		for taks := range worker {
			fmt.Println(taks)
		}

	}()
	wg.Wait()
	fmt.Println("All tasks have been processed.")
}
