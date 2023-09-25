import md5 from 'md5'
const seed = 'cxdnnyjw'
var suffix = 0;
console.log(md5(seed));
var password = '';
const regex = /^00000/;
while(password.length <8){
  if(regex.test(md5(seed + suffix))){
    password += (md5(seed + suffix))[5];
  }
  suffix++;
}
console.log(password);