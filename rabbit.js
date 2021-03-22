async function eatCarrots(matrix, turn){
 // load garden visually
  loadGarden(matrix);

  let findStartingRow, findStartingColumn, startingRow, startingCol;
  
  if(matrix.length % 2 === 0){
    findStartingRow = Math.floor(matrix.length / 2); 
    startingCol = Math.floor(matrix[findStartingRow].length / 2);
    
    if(matrix[findStartingRow - 1][startingCol] > matrix[findStartingRow][startingCol]){
      startingRow = findStartingRow - 1;
      matrix[findStartingRow - 1][startingCol] = 0;
    } else {
      startingRow = findStartingRow;
      matrix[findStartingRow][startingCol] = 0;
    }
  } else {
    startingRow = Math.floor(matrix.length / 2); 
    findStartingColumn = Math.floor(matrix[startingRow].length / 2);
    
    if(matrix[startingRow].length % 2 === 0){
      if(matrix[startingRow][findStartingColumn] < matrix[startingRow][findStartingColumn - 1]){
        startingCol = findStartingColumn - 1;
        matrix[startingRow][findStartingColumn - 1] = 0;
      }  else {
        startingCol = findStartingColumn;
        matrix[startingRow][findStartingColumn] = 0;
      }
    }
  }

  // loadGarden(matrix);

  let collectCarrots = 0;
    
  while(turn > 0){
    await sleep(1000);
    loadGarden(matrix);

    let check = checkSurroundings(startingRow, startingCol);

    startingRow = check[0];
    startingCol = check[1];
   
    collectCarrots += matrix[startingRow][startingCol];

    turn--;
    matrix[startingRow][startingCol] = 0;
    renderBunny(startingRow,startingCol);
    document.getElementById('score').innerHTML = collectCarrots;
    document.getElementById('moves').innerHTML = turn;
 }
}

function renderBunny(row,col){
    let square = document.getElementById(row + '' + col);
    square.innerHTML = '🐇';
}

function checkSurroundings(row, col){
    let left = 0, right = 0, up = 0, down = 0;
    let newCol, newRow;

    if(row + 1 < matrix.length){
        matrix[row + 1][col] === undefined ? down = 0 : down = matrix[row + 1][col];
    }
    if(row - 1 !== -1){
        matrix[row - 1][col] === undefined ? up = 0 : up = matrix[row - 1][col];
    }

    if(col + 1 < matrix[0].length){
        matrix[row][col + 1] === undefined ? right = 0 : right = matrix[row][col + 1];
    }
    
    if(col - 1 !== -1){
        matrix[row][col - 1] === undefined ? left = 0  : left = matrix[row][col - 1];
    }
    let max = Math.max(left, right, up, down);
    
    switch(max){
      case left: { newCol = col - 1; newRow = row; } break;
      case right: { newCol = col + 1; newRow = row; } break;
      case up: { newCol = col; newRow = row - 1; } break;
      case down: { newCol = col; newRow = row + 1; } break;
    }
    return [newRow, newCol];
  }

// load visual garden   
function loadGarden(matrix){
    let clear = document.getElementById('garden');
    clear.innerHTML = '';

    for(let i = 0; i < matrix.length; i++){
        let row = document.createElement('tr');
        row.classList.add('row');
        for(let j = 0; j < matrix[i].length; j++){
            let col = document.createElement('td');
            col.innerHTML = matrix[i][j] + '🥕';
            col.classList.add('col');
            col.id = i + '' + j;
            row.appendChild(col);
        }
        let div = document.getElementById('garden');
        div.appendChild(row);
    }
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

// this is the matrix 
let matrix = 
   [[2, 6, 7, 9, 2, 4],
    [1, 4, 2, 1, 4 ,2],
    [3, 5, 6, 8, 7, 8],
    [4, 2, 9, 1, 3, 2],
    [1, 5, 3, 5, 6, 1]];

// number of times the bunny might eat
let t = 17;

eatCarrots(matrix, t);