function wait1(t, callback) {
    console.log(t, callback);
    setTimeout(() => {
        callback("true");
    }, t * 1000);
}

function calculateTime(t1, t2, t3, starttime) {
    function finalCallBack(data) {
        t2 = new Date().getTime();
        console.log(data);
        console.log("2");
        console.log(t2 - starttime);
    }

    function callback2(data) {
        console.log(data);
        wait1(t3, finalCallBack);
    }
    
    function callback1(data) {
        console.log(data);
        wait1(t2, callback2);
    }

    wait1(t1, callback1);

    // wait1(t1, function (data1){
    //     console.log(data1);
    //     wait1(t2, function (data2){
    //         console.log(data2);
    //         wait1(t3, function (data3){
    //             console.log(data3);
    //             finalCallBack("123");
    //         });
    //     });
    // });
}

console.log("1");
t1 = new Date().getTime();
calculateTime(3, 4, 3, t1);

module.exports = calculateTime;
