import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
let data = fileRead.split('\n');
var counts = {};
var parsed;
var sortedCounts;
const pattern = /(^[a-z]+)(\d+)\[([a-z]+)\]/
var sum = 0;
data.pop();
data.forEach(function(item, i, array){
  data[i] = item.replace(/-/g, '');
  console.log(data[i])
  parsed = data[i].match(pattern);
  counts = {};
  for(var letter of parsed[1]){
    if(letter in counts){
      counts[letter]++;
    } else {
    counts[letter] = 1;
    }
  }
  sortedCounts = Object.keys(counts).sort(function(a, b){
  if(counts[a] == counts[b]){
    return (b > a ? -1 : 1);
  }
  return counts[b] - counts[a];
  })
  sortedCounts = sortedCounts.slice(0,5).join('');
  console.log(parsed.slice(1,4), sortedCounts, (sortedCounts== parsed[3]));
  if(sortedCounts == parsed[3]){
    sum += parseInt(parsed[2]);
  }
});
console.log(sum);
console.log(parsed, parsed[3], sortedCounts);

