package generic

import (
	"fmt"
	"time"
)

type GenericPool struct {
	taks    <-chan interface{}
	results chan<- interface{}
}

func (w *GenericPool) Exec() {
	for message := range w.taks {
		fmt.Println("process the message: %v ", message)
		time.Sleep(time.Second)
		w.results <- true
	}
}

func NewPool(taks <-chan interface{}, results chan<- interface{}) *GenericPool {
	return &GenericPool{
		taks:    taks,
		results: results,
	}

}
