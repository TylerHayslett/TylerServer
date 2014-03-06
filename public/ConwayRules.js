//Variables and the like
var columns = 60;
var rows = 30;
var board = new Array(rows);
var thread = null;
var timing = 1000; //in ms

//user button methods
function go(){
	document.getElementById("button").innerHTML = '<button id="button" type="button" class="button" onclick="pause()">Pause</button>';
	thread = setInterval("update()", timing);
}

function pause(){
	document.getElementById("button").innerHTML = '<button id="button" type="button" class="button" onclick="go()">Start</button>';
	window.clearInterval(thread);
}

function randomize(){
	board = new Array(rows);
	for (var i = 0; i < rows; i++) {
		board[i] = new Array(columns);
		for (var h = 0; h < columns; h++) {
			board[i][h] = Math.round(Math.random());
		}
	}
	drawBoard();
}

function clearBoard(){
	buildBoard();
}



//visualization
function drawBoard(){
	var boardDeff = "";
	for(var row = 0; row < rows; row++){
		for(var column = 0; column < columns; column++){
			if(board[row][column] == 1){
				boardDeff = boardDeff + ' <img id="Alive" onclick="killCell(event)" coord="' + row + ' ' + column + '" src="glossy-square-button-black.jpg" width="30" height="30" style="position: absolute; top: ' + (row * 30) + 'px; left: ' + (column * 30) + 'px;">';
			}
			else{
				boardDeff = boardDeff + ' <img id="Dead" onclick="birthCell()" coord="' + row + ' ' + column + '" src="glossy-square-button-black.jpg" width="30" height="30" style="position: absolute; top: ' + (row * 30) + 'px; left: ' + (column * 30) + 'px;">';
			}
		}
	}
	document.getElementById("board").innerHTML = boardDeff;
}

//Initialization of the boardspace
function buildBoard(){
	board = new Array(rows);
	for (var i = 0; i < rows; i++) {
		board[i] = new Array(columns);
		for (var h = 0; h < columns; h++) {
			board[i][h] = 0;
		}
	}
	drawBoard();
}

//updates and runs the actual game
function update(){
	var boardTemp = new Array(rows);
	for (var i = 0; i < rows; i++) {
		boardTemp[i] = new Array(columns);
	}
	for(var row = 0; row < rows; row++){
		for(var column = 0; column < columns; column++){
			boardTemp[row][column] = checkCell(row, column);
		}
	}
	board = boardTemp;
	drawBoard();
}
	
function checkCell(_row, _column){
	var sum = summer(_row, _column);
	if((sum < 2) || (sum > 3)){
		return 0;
	}
	else if(sum == 3){
		return 1; 
	}
	else if(sum == 2){
		return board[_row][_column];
	}
	else{
		return 0;
	}
}

function updateCell(stringLoc){
	var cords = stringLoc.split(" ");
	var cellValue = board[parseInt(cords[0])][parseInt(cords[1])];
	if(cellValue == 1){
		board[parseInt(cords[0])][parseInt(cords[1])] = 0;
		return "Dead";
	}
	else{
		board[parseInt(cords[0])][parseInt(cords[1])] = 1;
		return "Alive";
	}
}

function summer(_row, _column){
	var sum = 0;
	for(var row = _row - 1; row < _row + 2; row++){
		for(var column = _column -1; column < _column + 2; column++){
			if((((row < 0) || (column < 0)) || ((row > (rows - 1) || (column > (columns -1))))) || ((row == _row) && (column == _column))){
			
			}
			else{
				sum += board[row][column];
			}
		}
	}
	return sum;
}
