import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
let data = fileRead.split('\n');
data.pop();
let pass = 0;
data = data.map(function(item){
  item = item.trim().split(/\s+/);
  item = item.map(function(value){
    return parseInt(value);
  })
  return item;
});

const validTriangle = function(a, b, c){
  if(((a + b) <=  c) || ((a + c <= b)) || ((b + c <= a))) return false;
  return true;
}

for(var i = 0; i < 3; i++){
  for(var j = 0 ; j < data.length ; j++){
    if(validTriangle(data[j][i], data[++j][i], data[++j][i])){
      pass++;
     } 
    }
  }
console.log(pass);