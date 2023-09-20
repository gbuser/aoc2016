import fs from 'fs';
const path = "data";
const fileRead = fs.readFileSync(path, 'utf8' );
const data = fileRead.split('\n');

function U(position){
  return (position < 3 ? position: (position - 3));  
};

function D(position){
  return (position > 6 ? position : (position + 3));
};

function L(position){
  return((position % 3) == 1 ? position : (position - 1));
};

function R(position){
  return((position % 3) == 0 ? position : (position + 1));
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
  }
  combo[i] = position;
}
console.log(combo);