import md5 from 'md5';
let seed = "jlmsuwbz"
//seed = "abc"; //uncomment to test
let r3 = /(.)\1\1/;
let r5 = /(.)\1\1\1\1/;
let threes = {};
let fives = {};
let goodKeys = [];
let hashes =[];
makeHash(seed, 24000);//24000 is empiric/arbitrary. would be better not to overcalculate
makeThrees();
makeFives();
validateKeys();
console.log(goodKeys[63])

function validateKeys(){//takes each 3 match and checks to see if any 5s in next 1000
  for(let key in threes){
    let char = threes[key];
    if(fives[char]){
      for(let item of fives[char]){
        let upperBound = +key + 1001;
        if((item > key) && (item < upperBound)){
          goodKeys.push(key)
          break;
        }
      }
    }
  }
}
 
function makeHash(seed, n) { //creates an array of n stretched hashes
  for(let i = 0; i < n ; i++){
    let hash = seed + i
    for(let j = 0; j < 2017 ; j++){
      hash = md5(hash)
    }
    hashes.push(hash)
    if(i%1000 == 0) console.log(i);
  }
}

function makeThrees(){//create object of all threes with index/character as key/value
  hashes.forEach((hash, index) => {
    if(hash.match(r3)){
      let char = hash.match(r3)[0][0];
      threes[index] = char;
    }
  })
}

function makeFives(){//create obj with fives sorted into bins for each char
  hashes.forEach((hash, index) =>{
    if(hash.match(r5)){
      let char = hash.match(r5)[0][0];
      console.log("found five at ", index);
      if(char in fives){
        fives[char].push(index);
      }
      else {
        fives[char] = [index];
      }
    }
  })
}