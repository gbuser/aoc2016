import fs from 'fs';
const path = "data";
const fileRead = fs.readFileSync(path, 'utf8' );
const data = fileRead.split('\n');

//accumulator is an array of objects, each object a dict of letter frequency
//by position
const tally = data.reduce((accumulator, item) =>{
  let index = 0;
  for(let char of item){
    if(!accumulator[index][char]) accumulator[index][char] = 1;
    else accumulator[index][char]++;
    index++;
  }
  return accumulator;
}, [{},{},{},{},{},{},{},{},]);

var text = '';
tally.forEach((item)=> {
  var sorted = Object.keys(item).sort((a,b) =>{
    return item[a] -item[b]; //descending sort
  });
  text += sorted[0];
});
console.log(text);