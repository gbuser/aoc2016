import fs from 'fs';
const data = fs.readFileSync('data', 'utf8' );
console.log(data, data.length);
let len = data.length;
//lets make row 1
let row_1 = [];
if(data[1] == '^') row_1.push('^')
else row_1.push('.');

for(let i = 1; i < len - 1 ; i++){
  let L = data[i-1], C = data[i], R = data[i + 1];
  if(L == '^' && C == '^' && R == '.') row_1.push('^');
  else if(L == '.' && C == '^' && R == '^') row_1.push('^');
  else if(L == '^' && C == '.' && R == '.') row_1.push('^');
  else if(L == '.' && C == '.' && R == '^') row_1.push('^');
  else row_1.push('.');
}

if(data[len -2] == '^') row_1.push('^');
else row_1.push('.');

console.log(row_1);
console.log(row_1.length);