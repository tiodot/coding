/**
 * implement text serch like chrome behavior
 * 
 */

function isMatch(source, target) {
  return source.toLowerCase() === target.toLowerCase();
}

function textSearch(source, keyword) {
  let result = [];
  let fast = keyword.length;
  let slow = 0;
  let lastMatched = '';
  while(fast <= source.length) {
      const str = source.slice(slow, fast)
      if (isMatch(keyword, str)) {
          if (lastMatched === str) {
            const tag = result.pop();
            result.push(str, tag);
          } else {
            result.push('<b>', str, '</b>');
          }
          slow = fast;
          fast = slow + keyword.length;
          lastMatched = str;
      } else {
          result.push(source[slow]);
          slow++;
          fast++;
          lastMatched = ''
      }
  }
  result.push(source.slice(slow));
  return result.join('');
}


console.log(textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', 'fox'));
// 'The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog'

console.log(textSearch('The hardworking Dog overtakes the lazy dog', 'dog'));
// 'The hardworking <b>Dog</b> overtakes the lazy <b>dog</b>'

console.log(textSearch('aaa', 'aa'))
// '<b>aa</b>a'
// This is because the second character cannot be used as a match again.

console.log(textSearch('aaaa', 'aa'));
// Correct: '<b>aaaa</b>'
// Wrong: '<b>aa</b><b>aa</b>'