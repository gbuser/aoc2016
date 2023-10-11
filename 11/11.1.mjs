import fs from 'fs';
import percom from 'percom'
const data = fs.readFileSync("data", 'utf8' ).trim().split("\n");
const CG = 512, PG = 256, RG = 128, SG = 64, TG = 32;//make obj {CG:512, PG:256...}
const CM = 16, PM = 8, RM = 4, SM = 2, TM = 1;
let floors = [0, SG+SM+PG+PM, TG+RG+RM+CG+CM, TM, 0]
data.forEach(line => console.log(line))
floors.forEach( floor => console.log(`${floors.indexOf(floor)}: ${floor}`))
const [goodElv, goodFloor] = [...makeGoods()];
let elevator = 1;
let moveList = listMoves(floors[elevator]);
console.log(moveList.length);
moveList.forEach( item => {
  console.log(`move: ${item}  ${testMove(item)}`)
})
moveList = moveList.filter(item => testMove(item));
console.log(`final move list length  = ${moveList.length}`);

function listMoves(value){
  let moveList = [];//array of possible moves
  for(let i = 0; i < 10 ; i++){
    if(value >> i & 1) moveList.push(2**i);//add the singles (negatives added later)
  }
  if(moveList.length < 2) {
    moveList.push(moveList[0] * -1);
    return moveList;
  }
  let perms = percom.com(moveList,2);//generate array of all perms of arr choose 2
  perms.forEach((perm, index) => {
    perms[index] = perm.reduce((acc, cur) => acc + cur, 0)
  })
  moveList.push(...perms);//movelist now has all possible, some illegal
  console.log(`move list now has ${moveList.length}`);
  moveList = moveList.filter( move => goodElv.has(move));//remove illegal elevator combos
  moveList.forEach(item => moveList.push(-1 * item));// add negatives to move elevator down
  console.log(`filtered move list now has ${moveList.length}`);
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
    if(((value >> i) & 1) && (!(value >> (i + 5) & 1))){// check each module for its gen
      if(value > 15) return false;//if no matching gen and any gens, fry
    }
  }
  return true;
}
function makeGoods(){
  let goodElv = new Set();
  let goodFloor = new Set();
  for(let i = 0; i < 1024 ; i++){
    if(testElevator(i)) goodElv.add(i);
    if(testFloor(i)) goodFloor.add(i);
  }
  return [goodElv, goodFloor];
}
function digest(floors){
  let result = '';
  floors.forEach(floor => {
    result += floor.toString();
    result += '.';
  })
  return result;
}
function testMove(value){
  if(value > 0 ){//move value up one floor
    if(elevator > 3) return false;//elevator is at the top
    if((testFloor(floors[elevator] - value)) && (testFloor(floors[elevator + 1] + value))){
      return true;
    }
  }
  if(value < 0) {// move value down one floor
    if(elevator < 2) return false; //elevator is at the bottom
    value *= -1;
    if((testFloor(floors[elevator] - value)) && (testFloor(floors[elevator - 1] + value))){
      return true;
    }
  }
  return false;
}