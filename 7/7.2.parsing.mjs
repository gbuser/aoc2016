import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
const data = fileRead.split('\n');
var tally = 0;

data.forEach(item => {
  var ABAs = parseABA(item)
  if(ABAs.length!= 0){
  for(var x of ABAs){
    if(foundInBracket(BAB(x), item)){
      tally++;
      break;
    }    
  }
}
})
console.log(tally);

function parseABA(text){
  var list = [];
  var inBracket = false;
  for(let i = 0; i < text.length - 2 ; i++){
    if(text[i] == '[') inBracket = true;
    if(text[i] == ']') inBracket = false;
    if((text[i] == text[i+2]) && (text[i]!= text[i+1]) && !inBracket && text[i+1]!= '[' && text[i+1]!=']')
      list.push(text[i] + text[i+1] + text[i+2]);
  }
  return list;
}

function BAB(text){
  return (text[1] + text[0] + text[1]);
}
function foundInBracket (BAB, text){
  var inBracket = false;
  for(let i = 0; i < text.length - 2 ; i++){
    if(text[i] == '[') inBracket = true;
    if(text[i] == ']') inBracket = false;
    if(inBracket && (text[i]+text[i+1]+text[i+2])==BAB)
      return true;
    }
    return false;
}