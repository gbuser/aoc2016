import fs from 'fs';
const path = "data";
const data = fs.readFileSync(path, 'utf8' );
let arr = data.split(", ");
let currentPosition = [0,0];
let currentVector = [0,1];
let locations = [[0,0]];
let solved = false;

function R(currentVector) {//rotate direction R (clockwise)
  let tmp = currentVector[0];
  currentVector[0] = currentVector[1];
  currentVector[1] = tmp * (-1);
};

function L(currentVector) {//rotate direction L (counterclockwise)
  let tmp = currentVector[0];
  currentVector[0] = currentVector[1] * (-1);
  currentVector[1] = tmp;
};

const turn = {//array of both turning functions
  R,
  L,
};

function move(currentVector, scalar, position) {
  //move one block at a time and generate path as you go
  for(var i = 0; i < scalar; i++){
    position[0] += currentVector[0]; 
    position[1] += currentVector[1];
    if(beenToBefore(position)){
      console.log(`SOLUTION: ${position}`);
      solved = true;
    };
    locations.push([...position]);
    //doesnt work without spread operator because you pushed a reference onto location
};
  return position;
};

function beenToBefore(position){
  for(var item of locations){
    if((item[0] == position[0]) && (item[1] == position[1])){
      return true;
    };
  };
  return false;
};

for(var item of arr){
  turn[item[0]](currentVector);
  currentPosition = move(currentVector, parseInt(item.slice(1)), currentPosition);
  if(solved){
    break;
  };
};