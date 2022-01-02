/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// width of board (7 columns)
let WIDTH = 7;
// height of board (6 rows ignoring the top most row for player moves)
let HEIGHT = 6;

// selecting restart button.
const restart = document.getElementById('restart');

const checkTurn = document.querySelector('#message');

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// function below is used to reset the baord if the 'restart button is clicked'
const resetGame = () => {
	const htmlBoard = document.querySelector('#board');
	htmlBoard.innerText = '';
	board = [];
	makeBoard();
	makeHtmlBoard();
	currPlayer = 1;
	checkTurn.innerText = `Current Player Turn: ${currPlayer}`;
};
restart.addEventListener('click', resetGame);

const letter = document.querySelectorAll('.letter');
const getRandRgb = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
};

setInterval(function() {
	for (let l of letter) {
		l.style.color = getRandRgb();
	}
}, 1500);

/** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */

const makeBoard = () => {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array(WIDTH).fill(null, 0));
	}
	return board;
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById('board');

	// TODO: add comment for this code
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);
	// code above is creating a table ROW element and assigning to variable 'top'
	// after new row is created, code adds id with the value of 'column-top' which will allow css styles to be applied.

	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	/*loop above is looping over the WIDTH variable which was set as 7 (7 columns for connect 4 board).
	each time the loop completes, a new table DATA elment is created which is assignd to 'headCell' variable.
	each headCell is given id attribute with the value of the x variable from the loop to help identify each circle players will use.
	*/

	htmlBoard.append(top);
	// appending top row to the main htmlboard. This will also include each new circle that was made from the loop above.

	// TODO: add comment for this code
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);

			const whiteCell = document.createElement('div');
			whiteCell.setAttribute('class', 'blank-cell');

			cell.append(whiteCell);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
	/* 
	loop above is creating a new row each time the loop iterates over the HEIGHT variable (6 rows for the main board arena)
	each time the loop is completed a new table ROW element is created
	a nested loop is then created to loop through the individual cells of each row and we use the WIDTH variable to get the table DATA elements created (squares) created which are assigned to the 'cell' variable.
	each 'cell' variable will be given an id that contain the coordinates of that cell and afterwards the cell is appended to the row parent element from the outer loop.
	once the inner loop has been appended, the row is appended to the htmlBoard variable.
	*/
	checkTurn.innerText = `Current Player Turn: ${currPlayer}`;
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
	// TODO: write the real version of this, rather than always returning 0
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (board[y][x] === null) {
			return y;
		}
	}
	return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
	// TODO: make a div and insert into correct table cell
	const mainRowCircle = document.getElementById(`${y}-${x}`);
	console.log(`${y}-${x}`);
	const playerPiece = document.createElement('div');
	playerPiece.classList.add('piece', `player${currPlayer}`);
	mainRowCircle.append(playerPiece);
};

/** endGame: announce game end */

const endGame = (msg) => {
	// TODO: pop up alert message
	alert(msg);
};

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (board.every((matrix) => matrix.indexOf(null) === -1)) {
		alert('TIE GAME!');
	}

	// switch players
	if (currPlayer === 1) {
		currPlayer = 2;
		checkTurn.innerText = `Current Player Turn: ${currPlayer}`;
	} else {
		currPlayer = 1;
		checkTurn.innerText = `Current Player Turn: ${currPlayer}`;
	}
};

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
		// looping over each row of the board.
		for (let x = 0; x < WIDTH; x++) {
			// looping over each column for each row.
			const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			// horizontal check works as follows. first y,x coordinate (0-0) and then you begin adding one to X to get the remaining 3 dots in that row.
			const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			// vertical check works as follows. First y-x coordinate (0-0) and then the loop begins adding one to each y coordinate to get the remaining dots below.
			const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			// diagnoal(RIGHT) variable works as follows. First y-x coordinate (0-0). variable then checks each diagonal dot by adding 1, 2, or 3 to each variable index.
			const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];
			// diagnoal(LEFT) variable works similar to previous variable BUT only x coordinate is being updated expect this time, x-coordinate is going backwards (down to the left)

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
			// if ANY of the variables evaluate to true through the '_win' function which is checking every individual cell, then the conditional evaluates to true and a winner is found. function is called under conditional within handleClick function.
		}
	}
}

makeBoard();
makeHtmlBoard();
