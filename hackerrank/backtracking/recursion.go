package main

// To work with recursion we need to know the base conditional
func factorial(n int) int {
	if n == 0 {
		return 1
	}
	return n * factorial(n-1)
}

func main() {

	factorial(5)

}
