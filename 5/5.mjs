import md5 from 'md5'
const seed = 'cxdnnyjw'
var suffix = 0;
console.log(md5(seed));
var password = '';
const regex = /^00000/;
while(password.length <8){
  var hash = md5(seed + suffix);
  if(regex.test(hash)){
    password += (hash)[5];
  }
  suffix++;
}
console.log(password);