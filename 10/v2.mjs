import fs from 'fs';
const fileRead = fs.readFileSync("data", 'utf8' );
var data = fileRead;
data = data.trim().split("\n");

let values = (data.filter ( item => item.startsWith('v')));
let botRules = (data.filter (item => item.startsWith('b')));
let outputs = [];

class Bot{
  constructor (i){
    this.number = i;
    this.first = null;
    this.high = null;
    this.low = null;
    this.giveHigh = {
      target: null,
      number: null,
    };
    this.giveLow = {
      target: null,
      number: null,
    };
  }
  give(value){
    if(this.first){
      this.high = value > this.first ? value : this.first;
      this.low = value > this.first ? this.first : value;
      this.first = null;
    }
    else(this.first = value);
  }
  dumpBot() {
    console.log(`bot: ${this.number}`);
    console.log(`first: ${this.first}`);
    console.log(`high: ${this.high}`);
    console.log(`low: ${this.low}`);
    console.log(`give low: ${this.giveLow.target} ${this.giveLow.number}`);
    console.log(`give high: ${this.giveHigh.target} ${this.giveHigh.number}`);
    console.log("---------------");
    return 0;
    }
  trade() {
    if(!(this.high && this.low)){
      console.log(`bot error. High and low must be filled`);
    }
    else {
      if(this.giveLow.target == "output") outputs[this.giveLow.number] = this.low;
      if(this.giveLow.target == "bot") bots[this.giveLow.number].give(this.low);
      if(this.giveHigh.target == "output") outputs[this.giveHigh.number] = this.high;
      if(this.giveHigh.target == "bot") bots[this.giveHigh.number].give(this.high);
    }
    this.high = null;
    this.low = null;
  }
  }
let bots = makeBots(210);
loadValues(values, bots);
loadRules(botRules, bots);
for(let i = 0 ; i < 210; i ++){
  let full = bothFilled(bots);
  full.forEach(bot =>{
    bot.trade()
  })
  if(winner(bots)) break;
}

function makeBots(howMany){
  let arr = [];
  for(let i = 0 ; i < howMany ; i++){
    arr.push(new Bot(i));
  }
  return arr;
}

function loadValues(values, bots){
  values.forEach(line => {
    const [, value, , , , bot] = line.split(' ');
    bots[bot].give(value);
  })
}

function bothFilled(bots){
  let arr= [];
  bots.forEach(bot => {
    if(bot.high && bot.low) {
      arr.push(bot);
    }
  })
  return arr;
}

function loadRules(botRules, bots){
  botRules.forEach(rule => {
    const [, donor, , , , typeLow, giveLow, , , , typeHigh, giveHigh] = rule.split(' ');
    bots[donor].giveLow.target = typeLow;
    bots[donor].giveLow.number = giveLow;
    bots[donor].giveHigh.target = typeHigh;
    bots[donor].giveHigh.number = giveHigh;
  })
}

function winner(bots){
  bots.forEach(bot => {
    if(bot.high == 61 && bot.low == 17){
      console.log("Winner!");
      bot.dumpBot();
      return true;
    }
  })
  return false;
}
