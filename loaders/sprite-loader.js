
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

module.exports = function(source) {
    const callback = this.async();
    let imgs = [];
    let imgUrls = [];

    imgs = source.match(/url\((\S*)\?_sprite/g);
    
    imgs.forEach((str) => {
        let res = str.match(/url\((\S*)\?_sprite/)[1];
        imgUrls.push(path.join(__dirname, res));
    })

    Spritesmith.run({src: imgUrls}, (err, result) => {
        fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.png'), result.image);
        let code = source.replace(/url\((\S*)\?_sprite\)/g, (match) => {
            return `url("dist/sprite.png")`
        })
        fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), code);
        callback(null, code);
    })
}