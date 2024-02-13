
// counter using setInterval

time = 0
end = 10

let timer = setInterval(() => {
    if (time <= end){
        console.log(time)
        time += 1
    }
    else{
        clearInterval(timer)
    }
}, 1000)
clearInterval(timer)

// counter using setInterval

time = 0
end = 10

function increase() {
    if (time <= end) {
        console.log(time)
        time += 1
        setTimeout(increase, 1000)
    }
}
increase()