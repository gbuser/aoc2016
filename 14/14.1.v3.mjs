import md5 from 'md5'
let seed = "jlmsuwbz"
//seed = "abc";
let r3 = /(.)\1\1/
let r5 = /(.)\1\1\1\1/
let suffix = 1;
let goodKeys = []
while(goodKeys.length < 64){
  let hash = md5(seed + suffix);
  let match3 = hash.match(r3);
  if(match3){
    for(let i = suffix + 1; i < suffix + 1001 ; i++){
      let hash = md5(seed + i);
      let match5 = hash.match(r5);
      if(match5){
        if(match5[0][0] == match3[0][0]){ 
          goodKeys.push(suffix)
          break;
        }
      }
    }
  }
  suffix++;
}
console.log(goodKeys[63]);