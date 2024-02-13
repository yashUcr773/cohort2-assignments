/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    
    vowels = new Set(['a','e','i','o','u','A','E','I','O','U'])
    ans = 0
    for (let i of str){
        if (vowels.has(i)){
            ans += 1
        }
    }
    return ans
}

console.log(countVowels('the quick brown fox'))
module.exports = countVowels;