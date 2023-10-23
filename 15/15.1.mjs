import fs from 'fs';
const data = fs.readFileSync("data", 'utf8').trim().split('\n');
data.forEach(line => console.log(line));
let discs = [];
data.forEach(line => {
  let disc = {
    number: line.split(' ')[1][1],
    size: +line.split(' ')[3],
    start: +line.split(' ')[11]
  }
  discs.push(disc)
})
discs.forEach(disc => console.log(disc));
console.log("-----------");
let max = discs.reduce( (acc, cur) =>{
  return acc * cur.size
}, 1)
discs.sort((a,b) => b.size - a.size)
discs.forEach(disc => console.log(disc));
console.log("moves until return to starting position: ",max);

let candidates = []
for(let n = 1; n < max ; n++){
  candidates.push(n);
}
//------OOPS takes one second to reach the first disc!
/*discs.forEach(disc => {
  candidates = candidates.filter (n => ((n%disc.size + disc.start)%disc.size) == disc.size - disc.number)
  console.log(candidates.length);
})*/

/*candidates = candidates.filter( n => {
  return ((n%discs[0].size + discs[0].start)%discs[0].size == discs[0].size - discs.number)
})*/

candidates = candidates.filter( n => {
  return ((n%19 + 17)%19 == 19 - 6)
})
console.log(candidates.length);
console.log(candidates.slice(0, 10));
candidates = candidates.filter( n => {
  return ((n%17 + 11)%17 == 17 - 3)
})
console.log(candidates.length);
console.log(candidates.slice(0, 10));
candidates = candidates.filter( n => {
  return ((n%13 + 11) == 13 - 1)
})
console.log(candidates.length);
console.log(candidates.slice(0, 10));
candidates = candidates.filter( n => {
  return ((n%7 + 2) == 7 - 5)
})
console.log(candidates.length);
console.log(candidates.slice(0, 10));
candidates = candidates.filter( n => {
  return ((n%5 + 0) == 5 - 2)
})
console.log(candidates.length);
console.log(candidates.slice(0, 10));
candidates = candidates.filter( n => {
  return ((n%3 + 0) == 2)
})
console.log(candidates.length);
console.log(candidates.slice(0, 10));