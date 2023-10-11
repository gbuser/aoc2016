import fs from 'fs';
import percom from 'percom'
const data = fs.readFileSync("data", 'utf8' ).trim().split("\n");

const CG = 512, PG = 256, RG = 128, SG = 64, TG = 32;//make obj {CG:512, PG:256...}
const CM = 16, PM = 8, RM = 4, SM = 2, TM = 1;
const generators = [CG, PG, RG, SG, TG];
const modules = [CM, PM, RM, SM, TM];
let elevator = 1;
let floors = [[], [SG,SM, PG, PM], [TG, RG, RM, CG, CM], [TM], []]
data.forEach(line => console.log(line))
floors.forEach( floor => console.log(`${floors.indexOf(floor)}: ${floor}`))
//list.forEach( item => move(item, 1, 2))
console.log(testElevator(2));
let goodElv = new Set();
let goodFloor = new Set();
for(let i = 0; i < 1024 ; i++){
  if(testElevator(i)) goodElv.add(i);
  if(testFloor(i)) goodFloor.add(i);
}
console.log (goodElv.size, goodFloor.size)
let moveList = listMoves(floors[3]);

function listMoves(arr){
  let moveList = [];//array of possible moves
  arr.forEach( item => moveList.push([item]));//add singles
  if(arr.length < 2) return moveList;
  let perms = percom.com(arr,2);//generate array of all perms of arr choose 2
  moveList.push(...perms);//movelist now has all possible, some illegal
  moveList.forEach( (innerArr, index) => {
    moveList[index] = innerArr.reduce((acc, cur) => acc + cur, 0)
  })//replaces each moveList array with its sum
  return moveList;
}

function testElevator(value){ //takes a bitfield as integer
  if(value == 0) return false;//empty elevator dont run
  let arr = [];
  for(let i = 0; i < 10 ; i++){
    if(value >> i & 1) arr.push(i);//creates array of position of 1s
  }
  if(arr.length == 1) return true;//solo elevator always safe
  if(arr.length > 2) return false;//too many on elevator (shouldnt happen?)
  if(arr[1] - arr[0] == 5) return true;//a matched generator/module
  if((arr[1] < 5) || (arr[0] > 4)) return true; // two modules or two gens
  return false;// unmatched generator/module
}
function testFloor(value){
  for(let i = 0 ; i < 5 ; i++){
    if((value >> i) && (!(value >> (i + 5)))){// check each module for its gen
      if(value > 15) return false;//if no matching gen and any gens, fry
    }
  }
  return true;
}