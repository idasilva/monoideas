package main

import (
	"fmt"
	"sync"
	"time"
)

func hello(s sync.WaitGroup, index int) {

	time.Sleep(10)
	fmt.Println("hello from go routine %v", index)

}

func main() {

	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go hello(wg, i)
		wg.Done()

	}

	fmt.Println("exemplo of go")

	loadFunction := func(v int) {

		fmt.Println("valor %v", v)

	}

	a := []string{"1", "2"}

	for v, _ := range a {
		fmt.Println(v)
	}

	array := make([]string, 0, 10)
	array = append(array, "1")
	for key := range array {
		print(key)
	}

	for i := 0; i < 100; i++ {
		go loadFunction(i)
	}
	wg.Wait()
	fmt.Println("finished")

}
