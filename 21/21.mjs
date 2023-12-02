import fs from 'fs';
let data = fs.readFileSync('data', 'utf8').split('\n');
for(let i = 0; i < data.length ; i++){
  data[i] = data[i].split(' ')
}
let string = 'fbgdceah';
string = [...string];
//console.log(data[0]);
let functionObject = {
  swap: function(what, first, second){
      if(what == "position"){
        let tmp = string[first];
        string[first] = string[second];
        string[second] = tmp;
      }
      else if(what == "letter"){
        let firstIndex = string.indexOf(first);
        let secondIndex = string.indexOf(second);
        string[firstIndex] = second;
        string[secondIndex] = first;
      }
  },
  rotate: function(scheme, units){
    if(scheme == 'left'){
      for(let i = 0 ; i < units ; i++){
        string.push(string.shift());
      }
    }
    if(scheme == 'right'){
        for(let i = 0 ; i < units ; i++){
          string.unshift(string.pop());
        }
    }
    if(scheme == 'based'){
      //units logic here, then rotate right
      let index = string.indexOf(units);
      if (index >3){
        index++;
      }
      index++;
      for(let i = 0 ; i < index ; i++){
        string.unshift(string.pop());
      }
    }
  },
  reverse: function(first, second){
    let reversedPart = string.splice(first, (second - first) + 1);
    reversedPart.reverse();
    string.splice(first, 0, ...reversedPart);

  },
  move: function(from, to){
    let char = string.splice(from,1)[0];
    string.splice(to, 0, char);
  }

}
let unFunctionObject = {
  swap: function(what, first, second){
      if(what == "position"){
        let tmp = string[first];
        string[first] = string[second];
        string[second] = tmp;
      }
      else if(what == "letter"){
        let firstIndex = string.indexOf(first);
        let secondIndex = string.indexOf(second);
        string[firstIndex] = second;
        string[secondIndex] = first;
      }
  },
  rotate: function(scheme, units){
    if(scheme == 'right'){
      for(let i = 0 ; i < units ; i++){
        string.push(string.shift());
      }
    }
    if(scheme == 'left'){
        for(let i = 0 ; i < units ; i++){
          string.unshift(string.pop());
        }
    }
    if(scheme == 'based'){
      //units logic here, then rotate right
      let index = string.indexOf(units);
      let spin = 0;
      switch (index){
        case 0:
          spin = 7;
          break;
        case  1:
          spin = 7;
          break;
        case 2:
          spin = 2;
          break;
        case 3:
          spin = 6;
          break;
        case 4:
          spin = 1;
          break;
        case 5:
          spin = 5;
          break;
        case 6:
          spin = 0;
          break;
        case 7:
          spin = 4;
          break;
      }
      //console.log(`index: ${index} spin: ${spin}`)
      for(let i = 0 ; i < spin ; i++){
        string.unshift(string.pop());
      }
    }
  },
  reverse: function(first, second){
    let reversedPart = string.splice(first, (second - first) + 1);
    reversedPart.reverse();
    string.splice(first, 0, ...reversedPart);

  },
  move: function(from, to){
    let char = string.splice(to ,1)[0];
    string.splice(from, 0, char);
  }
}
function parseLines(data){
  data = data.map(line =>{
    if(line[0] == 'swap'){
      return [line[0], line[1], line[2], line[5]]
    }
    if(line[0] == 'rotate'){
      if(line[1] == 'based'){
        return [line[0], line[1], line[6]];
      }
      else {
        return [line[0], line[1], line[2]];
      }
    }
    if(line[0] == 'reverse'){
      return [line[0], line[2], line[4]]
    }
    if(line[0] == 'move'){
      return [line[0], line[2], line[5]]
    }
  })
  return data
}
export {string};
export {functionObject};
export {unFunctionObject};
export {parseLines};
export {data};