import fs from 'fs';
const data = fs.readFileSync("data", 'utf8').trim().split('\n');
let discs = [];
data.forEach(line => {
  let disc = {
    number: line.split(' ')[1][1],
    size: +line.split(' ')[3],
    start: +line.split(' ')[11]
  }
  discs.push(disc)
})
let newDisc = {
  number: 7,
  size: 11,
  start: 0
}
discs.push(newDisc);
let max = discs.reduce( (acc, cur) =>{
  return acc * cur.size
}, 1)

let candidates = []
for(let n = 1; n < max ; n++){
  candidates.push(n);
}


discs.forEach(disc => {
  candidates = candidates.filter(n => {
    return (n%disc.size + disc.start)%disc.size == disc.size - (disc.number% disc.size)
  })
})
console.log(candidates);