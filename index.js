const fs = require('fs')

const salsa20 = fs.readFileSync('salsa20.csv', 'utf8' , (err, data) => data).split('\r\n')
