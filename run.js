const fs = require('fs');
const path = require('path');

const glob = require('glob');

const yaml = require('yamljs');

const sass = require('node-sass');
const uglifycss = require('uglifycss');

const cssTransformation = require('css-transformation');

glob.sync('src/**/*.yml')
  .forEach(file => {
    console.log(file)
    const config = yaml.load(file);
    const content = sass.renderSync({
      data: ` @import "node_modules/@material/button/mdc-button.scss";
            @import "node_modules/@material/card/mdc-card.scss";
            @import "node_modules/@material/textfield/mdc-text-field.scss";`,
      includePaths: ['node_modules']
    });

    const res = cssTransformation(content.css, config);
    fs.writeFileSync(file.replace('.yml', '.js'), `export default ${JSON.stringify(res)}`);

  });