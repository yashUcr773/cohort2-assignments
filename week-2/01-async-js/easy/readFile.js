fs = require("fs");


async function write() {
    await fs.appendFile(__dirname + "/3-read-from-file.md", 'ass ', err=>{
        console.log(err)
    })
}
write()



async function read() {
    let x = await fs.readFile(
        __dirname + "/3-read-from-file.md",
        "utf-8",
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }
    );
    console.log(x)
    for (let i = 0; i < 1000000000; i += 1){}
    console.log('done')
}
read();

