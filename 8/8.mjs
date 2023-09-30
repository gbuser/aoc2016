import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
const data = fileRead.split('\n');
data.pop()
const rows = 6;
const cols = 50;
const rectRegex = /^rect (\d+)x(\d+)$/
const rowRegex = /^rotate row y=(\d) by (\d+)$/
const colRegex = /^rotate column x=(\d+) by (\d+)$/

var grid = []
for(let i = 0; i < rows ; i++){
  grid.push([]);
}
for(let row of grid){
  for(let i =0; i < cols ; i++){
    row.push(0);
  }
}

function printGrid(grid){
  for(var row of grid)
    console.log(row.join(''))
}

function rect(x, y, grid){
  for(let i = 0; i < y ; i++){
    for(let j = 0; j < x ; j++){
      grid[i][j] = 1;
    }
  }
}

function rotateRow(row, scalar, grid){
  for(let i = 0 ; i < scalar ; i++){
    grid[row].unshift(grid[row].pop())
  }
}

function rotateCol(col, scalar, grid){
  var tmp = [];
  for(let i = 0 ; i < rows ; i++){
    tmp.push(grid[i][col])
  }
  for(let i = 0; i < scalar ; i++){
    tmp.unshift(tmp.pop());
  }
  for(let i = 0 ; i < rows ; i++){
    grid[i][col] = tmp[i];
  }
}

function countLit(grid){
  return (grid.reduce((acc, cv) => {
     return acc + (cv.reduce((acc, cv) => acc + cv, 0))
  }, 0))
}

function processData(data){
  data.forEach((line) => {
    if(line.match(rectRegex)){
      rect(line.match(rectRegex)[1], line.match(rectRegex)[2], grid)}

    else if (line.match(rowRegex)){
      rotateRow(line.match(rowRegex)[1], line.match(rowRegex)[2], grid)}
      
    else if(line.match(colRegex)){
      rotateCol(line.match(colRegex)[1], line.match(colRegex)[2], grid)}
    
    else console.log(`error parsing ${line}`);
    }
  )
}
processData(data)
printGrid(grid)
console.log(countLit(grid))

