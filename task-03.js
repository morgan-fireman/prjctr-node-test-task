/*
Make a function that checks the sequence of parentheses 
  ((), {}, and [])
for syntactic correctness.
It eturns false if the passed string contains an invalid sequence
*/
const brackets = [
  ['[', ']'],
  ['{', '}'],
  ['(', ')']
];
const checkParentheses = (str) => {
  for (let group of brackets) {
    if (str.includes(group[0]) && str.includes(group[1])) {
      return str.indexOf(group[1]) > str.indexOf(group[0]);
    }
  }
  return false;
}

console.log(checkParentheses('--()--')) // true
console.log(checkParentheses('-a]--[')) // false
console.log(checkParentheses('dsa{vsfs{ad')) // false
console.log(checkParentheses('j78(g5b]uyg')) // false
console.log(checkParentheses(',m{i987y}hj')) // true
console.log(checkParentheses('dsa[3ed---:]::')) // true
