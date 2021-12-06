const fs = require('fs')

class CribDrag {
  constructor(salsa20file) {
    this.salsa20 = fs.readFileSync(salsa20file, 'utf8' , (err, data) => data).split('\r\n');
    this.bytes = this.salsa20.map(el => this.hexToBytes(el));
    fs.writeFileSync('bytes.csv', this.bytes.join('\r\n'));
  }
  
  hexToBytes(hex) {
    return Array.from(hex)
      .reduce((acc, curr, i, arr) => 
        i % 2 ? 
          acc : 
          [...acc, parseInt(curr + arr[i + 1], 16)], 
        [])
  } 
  
  xor(char, line, pos, discover) {
    return String.fromCharCode(
      char.charCodeAt(0)^
        this.hexToBytes(this.salsa20[line])[pos]^
        this.hexToBytes(this.salsa20[discover])[pos])
  }
  
  discover(char, line, pos) {
    return this.bytes.map((el, i) => {
      if(el[pos]) {
        el[pos] = i === line ? char : this.xor(char, line, pos, i);
      }
      return el.join(';');
    })
  }
  
  guess(char, line, pos) {
    fs.writeFileSync('result.csv', this.discover(char, line, pos).join('\r\n'))
    return this;
  }

  result() {
    fs.writeFileSync('text.txt', 
      fs.readFileSync('result.csv', 'utf8' , (err, data) => data)
        .split('\r\n')
        .map(el => el.split(';').join(''))
        .join('\r\n'))
  }
};

new CribDrag("salsa20.txt")
  .guess('T', 2, 0)
  .guess('h', 2, 1)
  .guess('e', 2, 2)
  .guess(' ', 2, 3)
  .guess(' ', 5, 4)
  .guess('u', 7, 5)
  .guess('o', 0, 6)
  .guess(' ', 0, 7)
  .guess('s', 11, 8)
  .guess(' ', 11, 9)
  .guess('h', 18, 10)
  .guess('e', 18, 11)
  .guess(' ', 18, 12)
  .guess(' ', 0, 13)
  .guess('f', 5, 14)
  .guess(' ', 5, 15)
  .guess('e', 18, 16)
  .guess(' ', 18, 17)
  .guess(' ', 0, 18)
  .guess(' ', 14, 19)
  .guess('h', 0, 20)
  .guess('e', 0, 21)
  .guess(' ', 0, 22)
  .guess(' ', 12, 23)
  .guess(' ', 11, 24)
  .guess('e', 8, 25)
  .guess(' ', 9, 26)
  .guess('.', 18, 27)
  .guess('n', 17, 28)
  .guess(' ', 6, 29)
  .guess('t', 5, 30)
  .guess('d', 0, 31)
  .guess(' ', 0, 32)
  .guess('h', 9, 33)
  .guess('t', 8, 34)
  .guess('e', 8, 35)
  .guess('r', 8, 36)
  .guess(' ', 8, 37)
  .guess(' ', 15, 38)
  .guess('t', 16, 39)
  .guess('a', 11, 40)
  .guess('v', 11, 41)
  .guess('e', 11, 42)
  .guess(',', 8, 43)
  .guess('h', 15, 44)
  .guess('m', 0, 45)
  .guess('e', 0, 46)
  .guess(',', 0, 47)
  .result()
