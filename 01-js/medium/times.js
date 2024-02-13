/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
    t1 = new Date().getTime()

    ans = 0
    for (let i = 0; i<=n; i += 1){
        ans += i
    }
    t2 = new Date().getTime()

    return (t2 - t1)/1000
}

times = [10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000]
for (time of times) {
    console.log(time.toLocaleString())
    console.log(calculateTime(time))
}