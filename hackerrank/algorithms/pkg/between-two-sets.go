package pkg

import (
	"errors"
	"go.uber.org/zap"
)

var (
	errCondition = errors.New("the first condition was not met")
)

/*
	- Given two arrays of integers apply the follow Conditions:
		- All elements in the first array is a factor of a given number
		- The Give number is a factor of all elements on the second array


	- Good To Know:
		- A number A is a factor of B if the MOD of B by A é zero 0
*/

type BetweenTwoSets struct {
	first  []int
	second []int
	logger *zap.Logger
}

func (a *BetweenTwoSets) Exec(number int) error {

	// Determine if the all elements in the first array is a factor of the given number
	// Determine if the number is a factor of all elements
	conditions := true
	for _, i := range a.first {
		for _, j := range a.second {
			if (number%i) == 0 && (j%number) == 0 {
				continue
			}
			conditions = false
		}
	}

	if !conditions {
		a.logger.Warn(errCondition.Error())
		return errCondition

	}
	return nil
}

func New(logger *zap.Logger) *BetweenTwoSets {
	return &BetweenTwoSets{
		first:  []int{2, 6},
		second: []int{24, 36},
		logger: logger,
	}
}
