const fs = require('fs');
const path = require('path');

const glob = require('glob');

const yaml = require('yamljs');

const sass = require('node-sass');
const uglifycss = require('uglifycss');

const cssChunks = require('css-chunks');

glob.sync('src/**/*.yml').forEach(file => {

  console.log(file)

  const config = yaml.load(file);
  console.log(config)

  const content = sass.renderSync({
    data: '@import "node_modules/@material/button/mdc-button.scss";',
    includePaths: ['node_modules']
  })
  console.log(content.css);

  // const from = k;
  // const to = files[k]
  // var css = sass.renderSync({file: 'node_modules/' + from,
  //   includePaths: [path.resolve(__dirname, 'node_modules')]}
  // ).css;
  const res = cssChunks(content.css, config);
  fs.writeFileSync(file.replace('.yml', '.js'), `export default ${JSON.stringify(res)}`);

});