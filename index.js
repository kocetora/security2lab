const fs = require('fs')

const salsa20 = fs.readFileSync('salsa20.csv', 'utf8' , (err, data) => data).split('\r\n')

const hexToBytes = hex => {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

const bytes = salsa20.map(el => hexToBytes(el))
fs.writeFileSync('bytes.csv', bytes.join('\r\n'))

const xor = (char, line, position, discover) => 
  String.fromCharCode(
    char.charCodeAt(0)^
      hexToBytes(salsa20[line])[position]^
      hexToBytes(salsa20[discover])[position])

const discover = (char, line, position) => bytes.map((el, i) => {
  el[position] = i === line ? char : xor(char, line, position, i);
  return el;
})

fs.writeFileSync('result.csv', discover('T', 2, 0).join('\r\n'))
fs.writeFileSync('result.csv', discover('h', 2, 1).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 2, 2).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 2, 3).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 5, 4).join('\r\n'))
// fs.writeFileSync('result.csv', discover('e', 7, 5).join('\r\n'))
// fs.writeFileSync('result.csv', discover('o', 8, 5).join('\r\n'))
// fs.writeFileSync('result.csv', discover('o', 8, 5).join('\r\n'))



