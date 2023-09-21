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
data.forEach(function(line){
 line.sort(function(a,b){return a-b})
 if(line[0] + line[1] > line[2]){
  pass++;
 } 
})
console.log(pass);