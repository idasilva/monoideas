package main

import (
	"fmt"
	"github.com/monoideas/hackerrank/algorithms/pkg"
	"go.uber.org/zap"
)

func main() {

	logger, _ := zap.NewProduction()
	defer func(logger *zap.Logger) {
		err := logger.Sync()
		if err != nil {

		}
	}(logger)

	_ = pkg.New(logger).Exec(12)

	//Its an exemplo using for

	list := make([]int, 0, 5)
	list = append(list, 1)
	list = append(list, 2)
	list = append(list, 3)
	list = append(list, 4)
	list = append(list, 5)

	for _, i := range list {
		logger.Info(fmt.Sprintf("number: %v", i))
	}

	//Init variables with values

	var a = 1
	var b = 2
	logger.Info(fmt.Sprintf("a: %v", a))
	logger.Info(fmt.Sprintf("b: %v", b))

	loadFunctions := func(c, d int) int {

		return c + d
	}
	logger.Info(fmt.Sprintf("result: %v", loadFunctions(1, 1)))

}
