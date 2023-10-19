import fs from 'fs'
import readline from 'readline';
let r3 = /(.)\1\1/;
let r5 = /(.)\1\1\1\1/;
let threes = {};
let goodKeys = [];
let counter = 0;
let suffix = 0;
let fives = {};
let stream = fs.createReadStream('hashes')
let rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity, // Handle both '\n' and '\r\n' line endings
});
rl.on('line', (line) => {
  if(line.match(r3)){
    let char = line.match(r3)[0][0];
    threes[suffix] = char;
  }  
  if(line.match(r5)) {
    let char = line.match(r5)[0][0];
    counter++;
    console.log('Line:',suffix, char, line);
    if(char in fives){
      fives[char].push(suffix);
    }
    else {
      fives[char] = [suffix];
    }
  }
  suffix++;
});
rl.on('close', () => {
  console.log('Final Counter Value:', counter);
  for( let key in fives){
    console.log(threes);
    console.log(key, fives[key]);
    validateKeys();
    console.log("goodkeys", goodKeys);
    console.log(goodKeys[63]);
  }
});

function validateKeys(){
  for(let key in threes){
    let char = threes[key];
    if(fives[char]){
      for(let item of fives[char]){
        let upperBound = +key + 1001;
        if((item > key) && (item < upperBound)){
          console.log(`found valid key at ${key}, ${char} validated at ${item}`);
          goodKeys.push(key)
          break;
        }
      }
    }
  }
}