// server

const os = require('os')
const path = require('path')
const { add, multiply, divide, subtract, mod } = require('./math') // 사용자 모듈

console.log(global)
console.clear()

// os : global
console.log(os.type())
console.log(os.version())
console.log(os.homedir())

// path : global
console.log(path.dirname(__filename)) // 실행 디렉토리명
console.log(path.basename(__filename)) // 실행 파일명
console.log(path.extname(__filename)) // 실행 파일 확장자명
console.log(path.parse(__filename)) // 파일의 주요 속성, return json object type

// math : user
console.log(multiply(12, 12))
console.log(add(25, 12))
console.log(divide(184, 12))
console.log(subtract(23, 12))
console.log(mod(230, 12))

