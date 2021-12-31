/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

// const restart = document.querySelector('#restart');
const checkTurn = document.querySelector('#message');

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// fucntion below is used to reset the baord if the 'restart button is clicked'
function resetGame() {
	const htmlBoard = document.querySelector('#board');
	// setting htmlBoard varibale to access the board table from html elements.
	htmlBoard.innerText = '';
	// setting the inner text of the board to be blank.
	board = [];
	// resetting board matrix to be an empty array.
	makeBoard();
	// making a new board with makeBoard() function.
	makeHtmlBoard();
	// calling makeHtmlBoard() to add the elements that were removed BACK to the page.
	currPlayer = 1;
	// resetting current player to be player 1 (default player)
	checkTurn.innerText = `>Player ${currPlayer}'s Turn`;
	// setting the text above the reset button to reset to player 1 -> 'Player 1's turn'
}

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array(WIDTH).fill(null, 0));
	}
	// function creates a new board in as the following:
	// loops over the height variable (6) adding 1 to the loop each time.
	// as the code loops over, the board varibale defined at the top gains a new row that is 7 values long. Each value that is passed is a 'null' value' starting at index of 0.
	return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById('board');
	// selecting board that was created from makeBoard() function.
	const gameArea = document.querySelector('#game');
	// selecting the game div to add new paragraph and button.
	const playerMsg = document.createElement('p');
	// creating new p element to display player turn.
	const restartBtn = document.createElement('button');
	playerMsg.setAttribute('class', 'message');
	// setting the class of message to the playerMsg variable.
	playerMsg.innerText = 'TESTING ';
	// inner text of player message to equal the current player's turn EX: `Player ${currPlayer}'s turn`
	restartBtn.setAttribute('id', 'restart');
	// setting restart id to restart button that was created.
	restartBtn.innerText = 'Restart Game';
	// setting inner text of the restart button to 'Restart Game'
	gameArea.appendChild(playerMsg);
	// adding player message to bottom of game area.
	gameArea.appendChild(restartBtn);
	// adding button below player mesasage area.

	// TODO: add comment for this code
	const top = document.createElement('tr');
	// creating table row element
	top.setAttribute('id', 'column-top');
	// setting id of top row to 'colum-top' which will allow css styles to be applied.
	top.addEventListener('click', handleClick);
	// each top circle is listening for a click event and passing the 'handleClick' callback (defined below)

	for (let x = 0; x < WIDTH; x++) {
		// looping over WIDTH variable (7)
		const headCell = document.createElement('td');
		// creating a new td element for each loop.
		headCell.setAttribute('id', x);
		// setting the id of each table data element to be the x count.
		top.append(headCell);
		// adding the new element to the table row that was created
	}
	htmlBoard.append(top);
	// adding the elements from the top row to the htmlBoard array.

	// TODO: add comment for this code
	for (let y = 0; y < HEIGHT; y++) {
		// looping over the HEIGHT variable. Height is set at 6 since the top row was added from the WIDTH variable.
		const row = document.createElement('tr');
		// creating a tr element eveyr time that loop completes. Six (6) rows.
		for (let x = 0; x < WIDTH; x++) {
			// looping over WIDTH variable to line up with main row.
			const cell = document.createElement('td');
			// every time loop completes we are creting a td element.
			const pieceDiv = document.createElement('div');
			// we are also creating a div element.
			pieceDiv.setAttribute('class', 'piece');
			// setting the new div class to 'piece' so that styling is applied from CSS.
			cell.appendChild(pieceDiv);
			// appending div element to td that was created.
			cell.setAttribute('id', `${y}-${x}`);
			// setting id attribute for the new td to be  the Y coordinate of the element and the X coordinate of the element.
			row.append(cell);
			// adding the cell to the tr element.
		}
		htmlBoard.append(row);
		// appenending the entire new row created to the htmlBoard array.
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

// function returns the value of the next available dot within that column. IF all values are filled for that column, return NULL.

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame

	// switch players
	// TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
