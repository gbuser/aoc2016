import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
const data = fileRead.split('\n');

var count = 0;
const tally ={
  iando: 0,
  justi: 0,
  justo: 0,
  neither: 0
};

function process(line){
  var inBracket = false;
  var matchedOut = false;
  var matchedIn = false;
  
  for(var i = 0; i < line.length - 3 ; i++){
    if(line[i] == '[') inBracket = true;
    if(line[i] == ']') inBracket = false;
    if((line[i] != line [i+1]) && (line[i] == line[i+3]) && (line[i+1] == line[i+2])){
      if(inBracket) return false;
      else matchedOut = true;
    }
  }
  return matchedOut;
}
for(var item of data){
  if(process(item)) count++;
}
console.log(count);