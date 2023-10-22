let seed = 1350;
let dim = 51;
let grid = new Array(dim);
for(let i = 0 ; i < dim ; i++){
  grid[i] = new Array(dim)
}

for(let x = 0 ; x < dim ; x++){
  for(let y = 0; y < dim ; y++){
    grid[y][x] = {open: isOpen(x,y), g: Infinity, x: x, y: y};
  }
}
let start = grid[1][1];
let current = start;
let visited = new Set();
let unvisited = new Set();
unvisited.add(current);
start.g = 0;

main()
console.log(visited.size)


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
  while (unvisited.size > 0){
    unvisited.delete(current);
    visited.add(current);
    let neighbors = getNeighbors(current)
    neighbors.forEach( neighbor => {
      if(!unvisited.has(neighbor) && (!visited.has(neighbor))){
        neighbor.g = current.g + 1;
        if(neighbor.g < 51){
        unvisited.add(neighbor)
        }
      }
    })
  
      current = findLowG(unvisited)
      console.log(`Current: (${current.x}, ${current.y}) g: ${current.g}`);
  }
}
function findLowG(unvisited){
  let lowSoFar = Infinity;
  let best = {};
  unvisited.forEach(item => {
    if(item.g < lowSoFar){
      lowSoFar = item.g;
      best = item;
    }
  })
    return best;
}