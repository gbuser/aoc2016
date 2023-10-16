import fs from 'fs';
const data = fs.readFileSync("data", 'utf8' ).trim().split("\n");
const command = {
  cpy: function(dest, obj, value){
    if(value in obj){
      obj[dest] = obj[value];
      obj.pc++;
    }
    else{
      obj[dest] = +value;
      obj.pc++;
    }
  },
  jnz: function(value, obj, dest){
    if(dest in obj){
      if(obj[dest]) obj.pc += +value;
      else obj.pc++
    }
    else {
      if(dest) obj.pc += +value;
      else obj.pc++
    }
  },
  inc: function(value, obj, dest){
    obj[dest]++;
    obj.pc++;
  },
  dec: function(value, obj, dest){
    obj[dest]--;
    obj.pc++;
  },
};
let state = {
  a: 0,
  b: 0,
  c: 1,
  d: 0,
  pc: 0,
};
let instructions = data.map(item => item.split(" "))
while(instructions[state.pc]){
  command[instructions[state.pc][0]](instructions[state.pc][2], state, instructions[state.pc][1])
}

  console.log(state, "\n");

