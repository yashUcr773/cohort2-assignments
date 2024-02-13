/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
    str = str.toLowerCase()
    l = 0;
    r = str.length - 1;

    while (l <= r) {
        if (str.charCodeAt(l) <= 97 || str.charCodeAt(l) >= 115) {
            l += 1;
            continue
        }
        if (str.charCodeAt(r) <= 97 || str.charCodeAt(r) >= 115){
            r -= 1;
            continue
        } 
        
        // console.log (str[l], str[r])
        if (str[l] == str[r]){
            l += 1
            r -= 1
        } else {
            return false
        }

    }

    return true

}

// console.log(isPalindrome("Palap"));
// console.log(isPalindrome("Palam"));
console.log(isPalindrome('Able, was I ere I saw Elba!'));

module.exports = isPalindrome;
