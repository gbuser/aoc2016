let start = "10011111011011001";
let disk = 35651584;

let dragon = dragonize(start, disk);
//checkSum(dragon)


function dragonize(start, disk){
  let a = [...start];
  while(a.length < disk){
    let b = [...a].reverse();
    b = b.map( item => item == '1'? '0':'1');
    a.push('0');
    a.push(...b);
  }
  return(a.slice(0,disk));
}

function checkSum(dragon){
  while(dragon.length%2 == 0){
    let tmp = [];
    while(dragon){
      if(dragon.shift() == dragon.shift()) tmp.push('1');
      else tmp.push('0');
    }
    dragon = [...tmp];
  }
  console.log(dragon);
}