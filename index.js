const fs = require('fs')

const salsa20 = fs.readFileSync('salsa20.txt', 'utf8' , (err, data) => data).split('\r\n')

const hexToBytes = hex => 
  Array.from(hex)
       .reduce((acc, curr, i, arr) => 
          i % 2 ? 
            acc : 
            [...acc, parseInt(curr + arr[i + 1], 16)], 
          [])

const bytes = salsa20.map(el => hexToBytes(el))
fs.writeFileSync('bytes.csv', bytes.join('\r\n'))

const xor = (char, line, position, discover) => 
  String.fromCharCode(
    char.charCodeAt(0)^
      hexToBytes(salsa20[line])[position]^
      hexToBytes(salsa20[discover])[position])

const discover = (char, line, position) => bytes.map((el, i) => {
  if(el[position]) {
    el[position] = i === line ? char : xor(char, line, position, i);
  }
  return el.join(';');
})

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
fs.writeFileSync('result.csv', discover(' ', 6, 29).join('\r\n'))
fs.writeFileSync('result.csv', discover('t', 5, 30).join('\r\n'))
fs.writeFileSync('result.csv', discover('d', 0, 31).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 0, 32).join('\r\n'))
fs.writeFileSync('result.csv', discover('h', 9, 33).join('\r\n'))
fs.writeFileSync('result.csv', discover('t', 8, 34).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 8, 35).join('\r\n'))
fs.writeFileSync('result.csv', discover('r', 8, 36).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 8, 37).join('\r\n'))
fs.writeFileSync('result.csv', discover(' ', 15, 38).join('\r\n'))
fs.writeFileSync('result.csv', discover('t', 16, 39).join('\r\n'))
fs.writeFileSync('result.csv', discover('a', 11, 40).join('\r\n'))
fs.writeFileSync('result.csv', discover('v', 11, 41).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 11, 42).join('\r\n'))
fs.writeFileSync('result.csv', discover(',', 8, 43).join('\r\n'))
fs.writeFileSync('result.csv', discover('h', 15, 44).join('\r\n'))
fs.writeFileSync('result.csv', discover('m', 0, 45).join('\r\n'))
fs.writeFileSync('result.csv', discover('e', 0, 46).join('\r\n'))
fs.writeFileSync('result.csv', discover(',', 0, 47).join('\r\n'))
const text = fs.readFileSync('result.csv', 'utf8' , (err, data) => data).split('\r\n').map(el => el.split(';').join('')).join('\r\n')
fs.writeFileSync('text.txt', text)


