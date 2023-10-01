import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
const data = fileRead;

var regex = /\((\d+)x(\d+)\)/;
var head = '';

function parse(tail){
  var match = tail.match(regex);
  if(!(match)){   //base case
    head += tail;
    return;
  }
  
  head += tail.slice(0, match.index); //recursive case
  var start = (match.index + match[0].length);//start is beginning of compressed text
  var end = (start + parseInt(match[1]));//end is first char after compressed text
  var compressed = tail.slice(start, end);
  var decompressed = decompress(compressed, match[2]);
  head += decompressed;
  parse(tail.slice(end));
}

function decompress(text, repeats){
  var result = '';
  for(let i = 0; i < repeats ; i++){
    result += text;
  }
  return result;
}
parse(data);
console.log(head.length);