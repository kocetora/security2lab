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

// console.log(String.fromCharCode(
//   'T'.charCodeAt(0)^
//     hexToBytes(salsa20[2])[0]^
//     hexToBytes(salsa20[0])[2]))

const discover = (char, line, position) => bytes.map((el, i) => {
  el[position] = i === line ? char : xor(char, line, position, i);
  return el;
})

// const magic = (char, line, position) => {
//   const code = bytes[line][position]
//   bytes.map(elLine => {
//     elLine.map(elPos => {
//       if (elPos === code) {
//         discover(char, elLine, elPos)
//       } else {
        
//       }
//     })
//   })
//   // fs.writeFileSync('result.csv', discover('T', 2, 0).join('\r\n'))
// }

fs.writeFileSync('result.csv', discover('T', 2, 0).join('\r\n'))
fs.writeFileSync('result.csv', discover('h', 2, 1).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 2, 2).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 2, 3).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 5, 4).join('\r\n'))
fs.writeFileSync('result.csv', discover('u', 7, 5).join('\r\n'))
fs.writeFileSync('result.csv', discover('o', 0, 6).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 0, 7).join('\r\n'))
fs.writeFileSync('result.csv', discover('s', 11, 8).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 11, 9).join('\r\n'))
fs.writeFileSync('result.csv', discover('h', 18, 10).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 18, 11).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 18, 12).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 0, 13).join('\r\n'))
fs.writeFileSync('result.csv', discover('f', 5, 14).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 5, 15).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 18, 16).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 18, 17).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 0, 18).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 14, 19).join('\r\n'))
fs.writeFileSync('result.csv', discover('h', 0, 20).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 0, 21).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 0, 22).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 12, 23).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 11, 24).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 8, 25).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 9, 26).join('\r\n'))
fs.writeFileSync('result.csv', discover('.', 18, 27).join('\r\n'))
fs.writeFileSync('result.csv', discover('n', 17, 28).join('\r\n'))



