const path = require('path');

const css = require('css');
const fs = require('fs');
const sass = require('node-sass');

const processCssMappings = require('./src/utils/ProcessCssMappings')

const mappingsDir = path.resolve(__dirname, './src/mappings');

    const file = "@material/button/mdc-button";

    processCssMappings(file)
      .then(res => {
        console.log(res)
        fs.writeFileSync('src/components/MaterialButton.css', css.stringify(res));
      });