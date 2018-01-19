const css = require('css');
const fs = require('fs');
const sass = require('node-sass');

const sourceCSS = sass.renderSync({ file: 'node_modules/@material/button/mdc-button.scss', includePaths: ['node_modules'] });

const parsedCSS = css.parse(sourceCSS.css.toString());

parsedCSS.stylesheet.rules.filter(r => r.type === 'rule').forEach(e => {
  e.selectors = e.selectors.map(s => `::slotted(${s})`);
});

const transformedCSS = css.stringify(parsedCSS);

fs.writeFile('src/components/MaterialButton.css', transformedCSS, function(err) {
  if (err) {
    return console.log(err);
  }
});
