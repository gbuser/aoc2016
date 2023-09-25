import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
let data = fileRead.split('\n');
data.pop();
//regex creates three option groups- initial string, sector and checksum 
const pattern = /(^[-a-z]+)(\d+)\[([a-z]+)\]/ 

let parsed = data.map(item => {
  return item.match(pattern); //returns match object array (0: original, 1-3: capture groups)
})
let filtered = parsed.filter(item =>{
  return topFive(item[1]) == item[3]; //returns lines where sorted top five = checksum
})
let answer = filtered.reduce((accumulator, item)=>
  accumulator + parseInt(item[2]), 0); //reduces filtered lines to sum of sectors
console.log(answer);
//could combine the map/filter/reduce by .'s, but would be ugly. 

function topFive(text){  //takes the text portion and returns top five letters, sorted
  let counts = {};
  for(let letter of text){
    if(letter == '-') continue; //ignore -'s lest they be counted
    if(letter in counts) counts[letter]++;
    else counts[letter] = 1;
  }
  let sortedFive = Object.keys(counts).sort((a,b) =>{
    if(counts[a] == counts[b]){ //secondary sort if same occurences is alphabetical
      return(b > a ? -1 : 1);  //return (b-a) fails as char math not allowed
    }
    return counts[b] - counts[a]; //primary sort by number of occurences
  }).slice(0,5).join(''); //take the top 5 and join into one string
  return sortedFive;
}
function cipherShift (cipher, sectorID){
  var plainText = [...cipher].map(item => {
    if(item == '-') return ' ';
    item = String.fromCodePoint(item.charCodeAt(0)+parseInt(sectorID) % 26);
    return (item > 'z' ? (String.fromCodePoint((item.charCodeAt(0)) - 26)) : item);
  })
  console.log(plainText.join(''), sectorID)
}
filtered.forEach(item => cipherShift(item[1], item[2]))