import md5 from 'md5'
const seed = 'cxdnnyjw'
var suffix = 0;
var password = [];
const regex = /^00000[0-7]/;
var found = [];
var count = 0;
while( count < 8){
  var hash = md5(seed + suffix);
  
  if(regex.test(hash)){
    if(found.includes(hash[5])){
      suffix++;
      continue;
    }
    else(found.push(hash[5]));
    console.log(hash);
    password[hash[5]] = hash[6];
    count++;
  }
  suffix++;
}
console.log(password.join(''));
