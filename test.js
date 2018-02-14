const fs = require('fs');
const css = require('css');


const content = fs.readFileSync('./tmp/mdc-dialog.css')

console.log(content.toString())

const parsedCss = css.parse(content.toString());

console.log(JSON.stringify(parsedCss.stylesheet.rules.filter(x => x.type === 'media'), null, 4))