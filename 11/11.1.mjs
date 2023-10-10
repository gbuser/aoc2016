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
let list = listMoves(floors[1]);
list.forEach( item => move(item, 1, 2))


function move(arr, from, to){
  if(testFloor([...floors[to], ...arr])) console.log("pass")
  else console.log("fail");
}
function listMoves(arr){
  let moveList = [];
  arr.forEach( item => moveList.push([item]));
  if(arr.length < 2) return moveList;
  let perms = percom.com(arr,2);
  moveList.push(...perms);
  console.log(`movelist has ${moveList.length} members`);
  moveList = moveList.filter(move => testElevator(move))
  console.log(`filtered movelist has ${moveList.length} members`);
  return moveList;
}
function testFloor(arr){
  if (!Array.isArray(arr)) {
    return false;
  }
  let result = true;
  modules.forEach(module => {
    if((arr.includes(module)) && !(arr.includes(module * 32))){
      if(arr.some( item => item > 16)) {
        result = false;
      }
   }
  })
  return result;
}
function testElevator(arr){
  if (arr.length == 0) return false;
  if ((arr[0] == 32 * arr[1]) || (arr[1] == 32 * arr[0])) return true;
  if((arr.some(unit => unit < 32)) && arr.some( unit => unit >16)) return false; 
  return true;
}
function notAllowedElevator(){
  let result = [0];
  generators.forEach(generator => {
    modules.forEach(module => {
      if (module * 32 != generator) {
        result.push([module, generator])
      }
    })
  })
  return result;
}
