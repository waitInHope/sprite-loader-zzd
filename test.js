
// 验证spritesmith的功能

const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

let sprites = ['./loaders/images/sprite1.png', './loaders/images/sprite2.jpg'];

Spritesmith.run({src: sprites}, (err, result) => {
    console.log(result.image);
    console.log(result.coordinates);
    console.log(result.properties);

    // 输出到dist目录
    fs.writeFileSync(path.join(__dirname, 'dist/sprites.png'), result.image);
})