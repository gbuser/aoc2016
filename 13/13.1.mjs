let seed = 1350;
let dim = 50;
let endX = 31;
let endY = 39;
//seed = 10, dim = 10, endX = 7, endY = 4; //uncomment to use sample
let openSet = new Set()
let grid = new Array(dim);
for(let i = 0 ; i < dim ; i++){
  grid[i] = new Array(dim)
}

for(let x = 0 ; x < dim ; x++){
  for(let y = 0; y < dim ; y++){
    grid[y][x] = {open: isOpen(x,y), g: Infinity, h: manhattanDistance(x, y, endX, endY), x: x, y: y};
  }
}
let start = grid[1][1];
let current = start;
let goal = grid[endY][endX];
openSet.add(start)
start.g = 0;
start.f = start.h;

let answer = main()
console.log(answer.f)


function count1s(num){
  let answer = 0, n = 0;
  while(num >> n){
    if(num>>n & 1) answer++;
    n++;
  }
  return answer;
}
function isOpen(x, y){
  let tmp = x*x + 3*x + 2*x*y + y + y*y + seed;
  return (count1s(tmp)%2 == 0 ? true : false);

}
function manhattanDistance(x1, y1, x2, y2){
  return (Math.abs(x1-x2) + Math.abs(y1-y2));
}
function getNeighbors(gridPoint){
  let x = gridPoint.x, y = gridPoint.y;
  let neighbors = [];
    if(x < (dim - 1)) neighbors.push(grid[y][x + 1]);
    if(y < (dim - 1)) neighbors.push(grid[y + 1][x]);
    if(x > 0) neighbors.push(grid[y][x -1]);
    if(y > 0) neighbors.push(grid[y - 1][x]);
    neighbors = neighbors.filter( item => item.open == true);
    return neighbors;
  }

function main (){
  while (openSet.size > 0){
    if(current == goal) return current;
    openSet.delete(current)
    let neighbors = getNeighbors(current)
    neighbors.forEach( neighbor => {
      let tentativeG = current.g + 1;
      if(neighbor.g > tentativeG){ 
        neighbor.g = tentativeG;
        neighbor.f = neighbor.g + neighbor.h;
        openSet.add(neighbor);
      }
    })
      current = findLowF(openSet)
      console.log(`Current: (${current.x}, ${current.y})  f: ${current.f} g: ${current.g} h: ${current.h}`);
  }
}
function findLowF(openSet){
  let lowSoFar = Infinity;
  let best = {};
  openSet.forEach(item => {
    if(item.f < lowSoFar){
      lowSoFar = item.f;
      best = item;
    }
  })
    //console.log(best)
    return best;
}