const path = require('path');
const yaml = require('yamljs');

const css = require('css');
const fs = require('fs');
const sass = require('node-sass');

const mappingsDir = path.resolve(__dirname, '../src/mappings');

function loadMappings() {
  const files = fs.readdirSync(mappingsDir)
  return files.map(file => {
    return yaml.load(path.join(mappingsDir, file));
  });
}

function processMappings(source) {

  const filename = path.basename(this.resource, '.scss');

  const mappings = loadMappings();
  const definition = mappings.find(x => this.resource.includes(x.source));

  if(!definition)
    return "module.exports = " + JSON.stringify({style: source});

  const res = Object.keys(definition.mappings)

    .map(key => {

      console.log("Mapping name", key)

      const mapping = definition.mappings[key];

      const parsedCss = css.parse(source)
      console.log(parsedCss.stylesheet.rules[0])

      const rules = parsedCss.stylesheet.rules
        .filter(rule => mapping.type === rule.type)
        .filter(rule => rule.selectors)
        .map(rule => {
          rule.selectors = rule.selectors
            .filter(selector => selector.match(mapping.regex) != null)
            .map(selector => selector.replace(new RegExp(mapping.regex), mapping.replace));

          return rule.selectors.length > 0 ? rule : null;
        })
        .filter(rule => !!rule);

      const stylesheet = {
        type: 'stylesheet',
        stylesheet: {
          rules: rules || [],
        }
      };

      const value = css.stringify(stylesheet)

      fs.writeFileSync(`${__dirname}/../tmp/${filename}-${key}.css`, value);

      return {
        key: key,
        value:value
      }

    })
    .reduce((acc, cur) => {
      acc[cur.key] = cur.value
      return acc;
    }, {});


  return "module.exports = " + JSON.stringify(res);
}

module.exports = processMappings


//console.log(processMappings("@material/button/mdc-button"))