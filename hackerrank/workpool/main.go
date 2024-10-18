//go:build windows

package main

import "github.com/monoideas/hackerrank/workpool/generic"

// func workers(jobs chan int, results chan bool) {
// 	for message := range jobs {
// 		fmt.Println("worker has finishe its jobs with message: %v", message)
// 		results <- true
// 	}

// }

func main() {

	taks := make(chan interface{}, 6)
	results := make(chan interface{}, 6)

	for i := 0; i < 3; i++ {
		go generic.NewPool(taks, results).Exec()
	}

	for i := 0; i < 6; i++ {
		taks <- i
	}

	close(taks)

	for i := 0; i < 6; i++ {
		<-results
	}

	// jobs := make(chan int)
	// results := make(chan bool)

	// for i := 0; i < 3; i++ {
	// 	go workers(jobs, results)
	// }

	// for i := 0; i < 3; i++ {
	// 	jobs <- i
	// }

	// close(jobs)

	// for i := 0; i < 3; i++ {
	// 	<-results
	// }

}
