package main

import (
	"fmt"
	"sync"
)

func exec(i int, wg *sync.WaitGroup) {
	fmt.Println(i)
	wg.Done()
}

func main() {

	var wg sync.WaitGroup

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go exec(i, &wg)
	}

	wg.Wait()
	fmt.Println("end")

}
