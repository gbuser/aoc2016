import { string } from './21.mjs';
import { data } from './21.2.mjs';
import { parseLines } from './21.2.mjs';
import { unFunctionObject } from './21.mjs';
let parsed = parseLines(data)
parsed.reverse()
parsed.forEach(line => {
  unFunctionObject[line[0]](...line.slice(1))})
console.log(string.join(''));