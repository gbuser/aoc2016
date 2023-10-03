import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
var data = fileRead;
//final answer is >10G chars long! can't have a string that long (obviously)
//fortunately, only the length is needed, so keep a cumulative length, trim the front which is fully
//decompressed and add its length
const tokenRegex = /\((\d+)x(\d+)\)/;//finds a token (axb) and captures token, a and b
const stringRegex = /[A-Z]+/;//captures leading string to trim

var token, compressed, decompressed;
let cumulative = 0;
let i = 0;

while(tokenRegex.test(data)){//main loop
data = trimLeader(data)//trim the leading string and add its length to `cumulative`
data = decompressAndSub(data)//parse the token, decompress the next segment and replace the token
if(i % 1000000 == 0) console.log(i, cumulative, data.length);//how long is this thing running?
i++
}
console.log(data);
console.log(cumulative, data.length);
console.log(cumulative + data.length);

function decompressAndSub(text){
  token = text.match(tokenRegex)
  compressed = text.slice(token[0].length, token[0].length + parseInt(token[1]));
  decompressed = decompress(compressed, parseInt(token[2]) -1);//`-1` because theres already one copy
  text = text.replace(token[0], decompressed) 
  return text;
}

function trimLeader(text){
  if(text.startsWith('(')) return text;
  let leader = text.match(stringRegex)[0];
  cumulative += leader.length;
  return text.slice(leader.length)
}
function decompress(text, repeats){
  return text.repeat(repeats)
  }


