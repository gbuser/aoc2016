let input = 3012210;
//input = 5; // uncomment for example case
let elves = new Array(input);
elves.fill(0) //if you dont put values in, no forEach!
elves=elves.map((elf, index) => [1, index + 1])
 
while(elves.length > 1){
  elves.forEach((elf, index) => {
  if (elf[0] > 0){
    elves[index][0] += elves[(index + 1)%elves.length][0]
    elves[(index + 1)%elves.length][0] = 0;
  }
})
  elves = elves.filter( elf => elf[0] > 0)//remove elves with no presents
}
console.log(elves[0]);
