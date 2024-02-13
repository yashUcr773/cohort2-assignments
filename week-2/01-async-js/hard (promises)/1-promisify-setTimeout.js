/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
         resolve(true)   
        }, n*1000)
    })
}

t1 = Date.now()
console.log('1')
wait(0).then(() => {
    t2 = Date.now()
    console.log('2')
    console.log(t2-t1)
})

module.exports = wait;
