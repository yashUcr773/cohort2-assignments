/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    s1 = {};
    s2 = {};

    _getDict(str1.toLowerCase(), s1);
    _getDict(str2.toLowerCase(), s2);

    for (key in s1) {
        if (s1[key] != s2[key]) return false
        else delete s2[key]
    }

    if (Object.keys(s2).length) return false

    return true

}

function _getDict(str, dic) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] == " ") continue;
        if (!dic[str[i]]) dic[str[i]] = 0;
        dic[str[i]] += 1;
    }
}

console.log(isAnagram('Debit Card', 'Bad Credit'))

module.exports = isAnagram;
