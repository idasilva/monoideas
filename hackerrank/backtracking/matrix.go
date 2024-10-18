package main

import (
	"fmt"
)

// Define the matrix
var matrix = [][]int{
	{1, 2, 3},
	{4, 5, 6},
	{7, 8, 9},
}

func main() {
	rows := len(matrix)
	cols := len(matrix[0])

	// Start recursion from the top-left corner of the matrix
	visited := make(map[[2]int]bool) // To track visited cells
	path := [][]int{}                // To store the path of visited cells

	// Start backtracking from the initial cell
	backtrack(0, 0, rows, cols, visited, path)
}

// Backtracking function to explore each cell
func backtrack(row, col, rows, cols int, visited map[[2]int]bool, path [][]int) {
	// Base case: Check if out of bounds or already visited
	if row < 0 || row >= rows || col < 0 || col >= cols || visited[[2]int{row, col}] {
		return
	}

	// Mark the cell as visited and add to the path
	visited[[2]int{row, col}] = true
	path = append(path, []int{row, col})

	// Print the current path
	fmt.Printf("Current path: %v\n", path)

	// Explore neighbors (right, down, left, up)
	backtrack(row, col+1, rows, cols, visited, path) // Move right
	backtrack(row+1, col, rows, cols, visited, path) // Move down
	backtrack(row, col-1, rows, cols, visited, path) // Move left
	backtrack(row-1, col, rows, cols, visited, path) // Move up

	// Backtrack: unmark the cell and remove from the path
	visited[[2]int{row, col}] = false
	path = path[:len(path)-1]
}
