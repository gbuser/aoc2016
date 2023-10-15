import percom from 'percom'
const elements = 2;
const HG = 8, LG = 4, HM = 2, LM = 1;
let winner = Infinity;
let gs = {
  floors: [0, HM + LM, HG, LG, 0],
  elevator: 1,
  turn: 0,
  base: 1, //dont bring the elevator any lower- moves up as low floor empties.
  archive: new Set(),
}
gs.archive.add(digest(gs.floors))
const [goodElv, goodFloor] = [...makeGoods(elements)];//create array of valid elevator states and valid floor states
debugDumpFloors(gs.floors, gs.elevator);
let moveList = listMoves(gs.floors[gs.elevator]).filter( item => testMove(item, gs));
//------------------------------------//
//at this point, we have the original state (gs) and a list of valid moves. 
dumpArr(moveList); 
moveList.forEach(item =>{
  let newState = move(item, gs);
  console.log(`turn: ${newState.turn}`);
  debugDumpFloors(newState.floors)
  play(newState);
})
console.log(`winner: ${winner}`);

function listMoves(value){
  let moveList = [];//creates a list of all inherently valid elevator moves from a floor value. 
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
function testElevator(value){//is this value permitted.elevagtor rules differ from floor
  let ones = 0;
  for(let i = 0 ; i < (elements * 2 ) ; i++){
    ones += ((value >> i ) & 1);//counts 1 bits in a value
  };
  if((ones < 1 ) || (ones > 2)) return false; //only two spots on elevator, empty dont run
  if (ones == 1) return true; //single always ok
  for(let i = 0; i < elements ; i++){
    if(((value >> i) & 1) && (!(value >> (i + elements) & 1)) && (value > ((2**elements) - 1))) return false;
  }
  return true;
}
function testFloor(value){//is this value permitted?
  for(let i = 0 ; i < elements ; i++){
    if(((value >> i) & 1) && (!(value >> (i + elements) & 1))){// check each module for its gen
      if(value > ((2**elements)-1)) return false;//if no matching gen and any gens, fry
    }
  }
  return true;
}
function makeGoods(elements){//iterates all possible values and filters invalid ones
  let goodElv = new Set();
  let goodFloor = new Set();
  for(let i = 0; i < 2**(elements * 2) ; i++){
    if(testElevator(i)) goodElv.add(i);
    if(testFloor(i)) goodFloor.add(i);
  }
  return [goodElv, goodFloor];
}
function digest(floors){//turns a floor array into one string for easy comparison 
  let result = '';
  floors.forEach(floor => {
    result += floor.toString();
    result += '.';
  })
  return result;
}
function testMove(value, state ){//i think should take the state object and filter dupes
  //console.log(`testing move ${value} with elevator at ${elevator}`);
  //old floor has to be valid. new floor has to be valid. digest cant be a repeat
  if(value > 0 ){//move value up one floor
    if(state.elevator > 3) return false;//elevator is at the top
    let oldFloor = state.floors[state.elevator] - value;
    let newFloor = state.floors[state.elevator + 1] + value;
    let tmpFloors = [...state.floors];
    tmpFloors[state.elevator] = oldFloor;
    tmpFloors[state.elevator + 1] = newFloor;
    if(state.archive.has(digest(tmpFloors))) return false; //repeated state
    if(testFloor(oldFloor) && testFloor(newFloor)) return true;
    }
  if(value < 0) {// move value down one floor
    if(state.elevator < (state.base + 1)) return false; //elevator is at the bottom/base
    value *= -1;
    let oldFloor = state.floors[state.elevator] - value;
    let newFloor = state.floors[state.elevator - 1] + value;
    let tmpFloors = [...state.floors];
    tmpFloors[state.elevator] = oldFloor;
    tmpFloors[state.elevator -1] = newFloor;
    if(state.archive.has(digest(tmpFloors))) return false;
    if(testFloor(oldFloor) && testFloor(newFloor)) return true;
    }
  return false;
}
function move(value, state){//need to clone floors and update
  let newState = {
    floors: [...state.floors],
    elevator: state.elevator,
    turn: state.turn + 1,
    base: state.base,
    archive: new Set(state.archive),
  };
  newState.floors[newState.elevator] -= Math.abs(value);
  newState.elevator += Math.abs(value)/value;
  newState.floors[newState.elevator] += Math.abs(value);
  newState.archive.add(digest(newState.floors));
  if(newState.floors[newState.base] == 0) newState.base++;
  if(newState.floors[4] == (2**(elements * 2)) - 1){
    //console.log("WINNER!!!!")
    //console.log(newState.turn)
  }
  return newState;
}
function play(state){
  if(state.turn >= winner) return;
  if(state.floors[4] == ((2**(elements * 2)) - 1)){
    console.log("WINNER!!!!!")
    console.log(state.turn);
    if(state.turn < winner) winner = state.turn;
    return;
  }
  let moveList = listMoves(state.floors[state.elevator]).filter( item => testMove(item, state));
  if(moveList.length == 0) return;
  dumpArr(moveList);
  moveList.forEach( item => {
    //console.log(item);
    let newState = move(item, state)
    console.log(`turn: ${newState.turn} play: ${item}`);
    debugDumpFloors(newState.floors, newState.elevator)
    play(newState)
  })
  return;

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