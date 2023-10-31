import fs from 'fs';
const data = fs.readFileSync('data', 'utf8');
let len = data.length, rowNums = 40;
rowNums = 400000;//comment out to do part one
let rows = [];
for(let i = 0; i < rowNums ; i++) rows.push([]);
rows[0] = [...data];
for(let i = 1; i < rowNums ; i++){
  populate(rows[i - 1], rows[i])
}

function populate(previous, next) {
  if(previous[1] == '^') next.push('^');
  else next.push('.');
  for(let i = 1; i < len - 1; i++){
    let L = previous[i - 1], C = previous[i], R = previous[i + 1];
    if(L == '^' && C == '^' && R == '.') next.push('^');
    else if(L == '.' && C == '^' && R == '^') next.push('^');
    else if(L == '^' && C == '.' && R == '.') next.push('^');
    else if(L == '.' && C == '.' && R == '^') next.push('^');
    else next.push('.');
  }
  if(previous[len - 2] == '^') next.push('^');
  else next.push('.');
}

let sum = rows.reduce((acc, cv) =>{
  return acc + cv.reduce((acc, cv) =>{
    if(cv == '.') return acc + 1;
    else return acc;
  }, 0)
}, 0)
console.log(sum);