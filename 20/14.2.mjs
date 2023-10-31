//highest number is 4294967295
import fs from 'fs';
let data = fs.readFileSync('data', 'utf8').split('\n');
let goodNumbers = 0;
data = data.map(line => {
  return line.split('-').map(item => parseInt(item))
})
data.sort((a, b) => a[0] - b[0]);
let end = 0;
for(let i = 0 ; i < data.length ; i++){
  if(end + 1 < data[i][0]){
    while(end + 1 < data[i][0]){
      goodNumbers++;
      end++;
  }
}
  if(data[i][1] > end){
    end = data[i][1]
  }
}
console.log(goodNumbers);



