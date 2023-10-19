import fs from 'fs'
import md5 from 'md5'
let seed = "jlmsuwbz"
//seed = "abc";
let suffix = 0;
let hash = seed + suffix;
let hashlist = [];

function hashToFile(hash){
  fs.writeFile('hashes', hash + '\n', { flag: suffix === 0 ? 'w' : 'a' }, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    // Continue to the next iteration after the write is complete
    suffix++;
    if (suffix < 30000) {
      nextHash();
    }
  }
});
}
function nextHash(){
  let hash = (seed + suffix);
  if(suffix%1000 == 0) console.log(suffix);
  for(let i = 0 ; i < 2017 ; i ++){
    hash = md5(hash)
  }
  hashToFile(hash);
}
nextHash();