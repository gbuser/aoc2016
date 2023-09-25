import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
let data = fileRead.split('\n');
console.log(data[0]);
data.forEach(function(item, i, array){
  data[i] = item.replace(/-/g, '');
})
var counts;

console.log(data[0])
const pattern = /(^[a-z]+)(\d+)\[([a-z]+)\]/
var parsed = data[0].match(pattern);
console.log(parsed);
counts = {};
for(var letter of parsed[1]){
  if(letter in counts){
    counts[letter]++;
  } else {
    counts[letter] = 1;
  }
  }
console.log(counts);
var sortedCounts = Object.keys(counts).sort(function(a, b){
  if(counts[a] == counts[b]){
    return (b > a ? -1 : 1);
  }
  return counts[b] - counts[a];
})
console.log(sortedCounts);
sortedCounts = sortedCounts.slice(0,5).join('');
console.log(sortedCounts);
