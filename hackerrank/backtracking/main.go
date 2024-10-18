package main

/*
	Problem: N-queen
	How to Solve: Using backtracking, we need to put all the queen on a chessboard.
	Bounding Funcions:
		- They can not be on the same row
		- They can not be on the same colums
		- They can not be on the same diagonal

	How to start:
		- We need a chessboard
		- We need to set how many queen need to be on the board without attack each other

*
*/

func boundingConditional(chessboard [][]bool, row, col, chessLen int) bool {
	for i := 0; i < row; i++ {
		if chessboard[i][col] {
			return false
		}

	}
	return false
}

func solve(chessboard [][]bool, row int, chessLen int, solved *[][]int) {

	for i := 0; i < chessLen; i++ {

		if boundingConditional(chessboard, row, i, chessLen) {

			chessboard[row][i] = true

			solve(chessboard, row+1, chessLen, solved)
		}

	}

}

func main() {

	chessLen := 4
	chessboard := make([][]bool, chessLen)
	for i := 0; i < 4; i++ {
		chessboard[i] = make([]bool, chessLen)
	}

	solve(chessboard, 0, 4, nil)

}
