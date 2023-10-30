let initial = "10011111011011001";
let disk = 35651584;
//disk = 272; uncomment to solve part one 
let head = new Array(disk);
let headptr = initial.length;//headptr will point to the first empty element
head.splice(0, 0, ...initial);
while(headptr < disk){
  head[headptr]= '0';
  for(let i = 1 ; i <= headptr ; i++){//this was the last bug, i must be <= headptr
    head[headptr + i ] = head[headptr-i] == '0' ? '1':'0';
  }
  headptr = headptr * 2 + 1;//move headptr to new end of data
  console.log(headptr);//debug
}
head = head.slice(0,disk);//trim data to disk size
let checksum = []
for(let i = 0; i < disk; i += 2){//this block should be done by the while loop, but works, so...
  if (head[i] == head[i + 1]) checksum.push('1');
  else checksum.push('0');
}
console.log(checksum.length);//debug

while(checksum.length%2 == 0){
  let tmp = [];
  for(let i = 0; i < checksum.length; i += 2){
    if (checksum[i] == checksum[i + 1]) tmp.push('1');
    else tmp.push('0');
  }
  checksum = [...tmp]
  console.log(checksum.length);//debug
  
}
console.log(checksum.join(''));