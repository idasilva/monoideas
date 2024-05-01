package main

/***
 	Backtracking is an algorithm used for solve specific problem when we have more than on solution.
	This algorithm is not focus on performance or only one solution.

	N-QUEENS: We need to put (N) Queens on a Chessboard with some restrictions:
		- All the Queens can't attack each other.
		- For do this need to guarantee the Queens is not in the same row, column or diagonal.
**/

func constrains(chessboard [][]bool, row, col, queens int) bool {
	// validate if there is queen in the column
	for i := 0; i < row; i++ {
		if chessboard[i][col] {
			return false
		}
	}

	return false

}

func solve(chessboard [][]bool, row int, queens int, solved *[][]int) {
	for i := 0; i < queens; i++ {

		if constrains(chessboard, row, i, queens) {

			chessboard[row][i] = true

			solve(chessboard, row+1, queens, solved)

		}
	}

}

func main() {
	// create a chessboard
	n := 5
	chessboard := make([][]bool, n)
	for i := 0; i < n; i++ {
		chessboard[i] = make([]bool, 5)
	}

	solve(chessboard, 0, n, nil)

}
