fs = require('fs')

async function cleaner() {
    let data = await fs.readFileSync(__dirname+'/test.txt', 'utf-8')
    data = data.split(' ')
    data = data.filter(elem => {return elem != '' || elem != '\r'})
    data = data.join(' ')
    
    data = data.split('\r\n')
    console.log(data)
    data = data.filter(elem => {return elem != ''})
    data = data.join('')
    fs.writeFileSync(__dirname+'/test.txt', data)   
}

cleaner()