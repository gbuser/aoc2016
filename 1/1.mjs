import fs from 'fs';
const path = "data";
const data = fs.readFileSync(path, 'utf8' );
let arr = data.split(", ");
let direction = 0;
function R(cardinal) {
  return((cardinal+5)% 4);
};
function L(cardinal) {
  return((cardinal+3)% 4);
};
const turn = {
  R,
  L,
};
let tally = [0,0,0,0];
for(var item of arr){
direction = turn[item[0]](direction);
tally[direction]+= parseInt(item.slice(1));
}
let manhattanDistance = Math.abs(tally[0]-tally[2]) + Math.abs(tally[1]-tally[3]);
console.log(manhattanDistance);