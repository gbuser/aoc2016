import fs from 'fs';
let data = fs.readFileSync('data', 'utf8').split('\n');
data = data.map(line => {
  return line.split('-').map(item => parseInt(item))
})
data.sort((a, b) => a[0] - b[0]);
data.forEach(line => console.log(line));
let end = 0;
for(let i = 0 ; i < data.length ; i++){
  if(end + 1 < data[i][0]){
    console.log(end  + 1);
    break;
  }
  if(data[i][1] > end){
    end = data[i][1]
  }
}