/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    
    

    return numbers.reduce((prev, curr) => {
        return Math.max(prev, curr)}, numbers[0])
}

console.log(findLargestElement([3, 7, 2, 9, 1]))
console.log(findLargestElement([]))
console.log(findLargestElement([-5, -10, -2, -8]))


module.exports = findLargestElement;