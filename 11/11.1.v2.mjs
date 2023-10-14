import fs from 'fs';
import percom from 'percom'
const elements = 2;
const HG = 8, LG = 4, HM = 2, LM = 1;
let floors = [0, HM + LM, HG, LG,  0];//initialize floors
const [goodElv, goodFloor] = [...makeGoods(elements)];//create array of valid elevator states and valid floor states
let elevator = 1;
let turns = 0;
let archive = new Set();
archive.add(digest(floors));
debugDumpFloors(floors, elevator);
makeGoods(elements)
let moveList = listMoves(floors[elevator]).filter( item => testMove(item, elevator, archive));
//moveList = moveList.filter( item => testMove(item, elevator, archive));
//let obj = move(moveList[0])
//debugDumpFloors(obj.floors)
play(move(moveList[0]))



function listMoves(value){
  let moveList = [];//array of possible moves
  for(let i = 0; i < elements * 2 ; i++){
    if(value >> i & 1) moveList.push(2**i);//add the singles (negatives added later)
  }
  if(moveList.length < 2) {
    moveList.push(moveList[0] * -1);//add negative singles
    return moveList;
  }
  let perms = percom.com(moveList,2);//generate array of all perms of arr choose 2
  perms.forEach((perm, index) => {
    perms[index] = perm.reduce((acc, cur) => acc + cur, 0)
  })
  moveList.push(...perms);//movelist now has all possible, some illegal
  //console.log(`move list now has ${moveList.length}`);
  moveList = moveList.filter( move => goodElv.has(move));//remove illegal elevator combos
  moveList.forEach(item => moveList.push(-1 * item));// add negatives to move elevator down
  //console.log(`filtered move list now has ${moveList.length}`);
  return moveList;
}
function testElevator(value){ 
  let ones = 0;
  for(let i = 0 ; i < (elements * 2 ) ; i++){
    ones += ((value >> i ) & 1);
  };
  if((ones < 1 ) || (ones > 2)) return false; //two spots on elevator, empty dont run
  if (ones == 1) return true; //single always ok
  for(let i = 0; i < elements ; i++){
    if(((value >> i) & 1) && (!(value >> (i + elements) & 1)) && (value > ((2**elements) - 1))) return false;
  }
  return true;
}
function testFloor(value){
  for(let i = 0 ; i < elements ; i++){
    if(((value >> i) & 1) && (!(value >> (i + elements) & 1))){// check each module for its gen
      if(value > ((2**elements)-1)) return false;//if no matching gen and any gens, fry
    }
  }
  return true;
}
function makeGoods(elements){
  let goodElv = new Set();
  let goodFloor = new Set();
  for(let i = 0; i < 2**(elements * 2) ; i++){
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
function testMove(value, elevator, archive){
  //console.log(`testing move ${value} with elevator at ${elevator}`);
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
function move(value){//need to clone floors and update
  let newFloors = [...floors];
  let newElevator = elevator;
  let newArchive = new Set(archive);
  //console.log(`move ${value} for ${digest(floors)} elevator at ${elevator}`)

  if(value > 0) {
    newFloors[elevator] -= value;
    newFloors[elevator + 1] += value;
    newElevator++;
  }
  if(value < 0) {
    value *= -1;
    newFloors[elevator] -= value;
    newFloors[elevator -1] += value;
    newElevator--;
  }
  let newDigest = digest(newFloors);
  if(archive.has(newDigest)){
    console.log(`Proposed move ${value} repeats ${newDigest}. Cancel move`);
    return null;
  }
  newArchive.add(digest(newFloors));
  let newState = {
    floors: newFloors,
    elevator: newElevator,
    turn: (turns + 1),
    archive: newArchive,
  }
  return newState;
}
function play(state, ){
  let floors = state.floors
  let elevator = state.elevator
  let turns = state.turn
  let archive = state.archive
  let moveList = listMoves(floors[elevator]).filter( item => testMove(item, elevator, archive));
  debugDumpFloors(floors, elevator);
  dumpArr(moveList)


}
function debugDumpFloors(floors, elevator){
  for(let i = 4; i >0 ; i--){

    let str = (`floor ${i}: ${floors[i].toString().padStart(2,'')}  ${floors[i].toString(2).padStart((elements * 2), '0')}`);
    if (elevator == i) str += " <-E";
    console.log(str);
  }
    console.log("---------");
}
function dumpArr (arr){
  arr.forEach( item => console.log(item))
}
