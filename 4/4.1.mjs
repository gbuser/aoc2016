import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
let data = fileRead.split('\n');
const pattern = /(^[a-z]+)(\d+)\[([a-z]+)\]/
var sum = 0;
data.pop();

data.forEach(function(item, i, array){
  let parsed = item.replace(/-/g, '').match(pattern);
  let counts = {};
  for(var letter of parsed[1]){
    if(letter in counts){
      counts[letter]++;
    } else {
    counts[letter] = 1;
    }
  }
  
  let sortedCounts = Object.keys(counts).sort(function(a, b){
    if(counts[a] == counts[b]){
      return (b > a ? -1 : 1);
    }
    return counts[b] - counts[a];
    })

  let top5 = sortedCounts.slice(0,5).join('');
  console.log(parsed.slice(1,4), top5, (top5== parsed[3]));
  if(top5 == parsed[3]){
    sum += parseInt(parsed[2]);
  }
});
console.log(sum);

