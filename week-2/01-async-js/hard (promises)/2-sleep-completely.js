/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    return new Promise(async (resolve, reject) => {
        t1 = new Date().getTime()
        while (new Date().getTime() - t1 <= milliseconds){}
        resolve(true)
    })
}

console.log('1')
sleep(10000)
console.log('2')

module.exports = sleep;
