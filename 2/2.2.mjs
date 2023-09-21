import fs from 'fs';
const path = "data";
const fileRead = fs.readFileSync(path, 'utf8' );
const data = fileRead.split('\n');
const excludes = {
  U: [1,2,4,5,9],
  D: [5,9,10,12,13],
  L: [1,2,5,10,13],
  R: [1,4,9,12,13]
}
function U(position){
  if(position == 3){
    return 1;
  }
  if(position == 13){
    return 11;
  }
  if(excludes.U.includes(position)){
    return position;
  }
  return (position - 4);
    
};

function D(position){
  if(position == 1){
    return 3;
  }
  if(position == 11){
    return 13;
  }
  if(excludes.D.includes(position)){
    return position;
  }
  return (position + 4);  
};

function L(position){
  if(excludes.L.includes(position)){
    return position;
  }
  return (position - 1);  
};

function R(position){
  if(excludes.R.includes(position)){
    return position;
  }
  return (position + 1);  
}

const direction = {
  U,
  D,
  L, 
  R,
};

let position = 5;
let combo = [];
for(let i = 0; i < 5; i++){
  for(var letter of data[i]){
    position = direction[letter](position);
    console.log(letter, position);
  }
  combo[i] = position;
}
console.log(combo);