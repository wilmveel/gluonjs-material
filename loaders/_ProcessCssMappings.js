const fs = require('fs');
const path = require('path');

const yaml = require('yamljs');
const css = require('css');

const mappingsDir = path.resolve(__dirname, '../src/mappings');

function processMappings(source) {

  var tempDir = path.resolve(__dirname, '../tmp');

  if (!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir);
  }


  const filename = path.basename(this.resource, '.scss');

  fs.writeFileSync(`${tempDir}/${filename}.css`, source);

  const files = fs.readdirSync(mappingsDir);

  files.forEach(file => {
    this.addDependency(path.join(mappingsDir, file));
  });

  const mappings = files.map(file => {
    return yaml.load(path.join(mappingsDir, file));
  });

  const definition = mappings.find(x => this.resource.includes(x.source));

  if (!definition)
    return "module.exports = " + JSON.stringify({style: source});

  const res = Object.keys(definition.mappings)

    .map(key => {
      const mapping = definition.mappings[key];
      const parsedCss = css.parse(source)
      const rules = parsedCss.stylesheet.rules
        .filter(rule => mapping.type.split(',').includes(rule.type))
        .map(rule => {

          if(rule.selectors) {
            rule.selectors = rule.selectors
              .filter(selector => selector.match(mapping.regex) != null)
              .map(selector => selector.replace(new RegExp(mapping.regex), mapping.replace));

            return rule.selectors.length > 0 ? rule : null;
          }

          if(rule.rules) {
            rule.rules = rule.rules
              .map(rule => {
                rule.selectors =rule.selectors
                  .filter(selector => selector.match(mapping.regex) != null)
                  .map(selector => selector.replace(new RegExp(mapping.regex), mapping.replace));

                return rule;
              })
          }

          return rule;


        })
        .filter(rule => !!rule);

      const stylesheet = {
        type: 'stylesheet',
        stylesheet: {
          rules: rules || [],
        }
      };

      const value = css.stringify(stylesheet)

      fs.writeFileSync(`${tempDir}/${filename}-${key}.css`, value);

      return {
        key: key,
        value: value
      }

    })
    .reduce((acc, cur) => {
      acc[cur.key] = cur.value
      return acc;
    }, {});


  return "module.exports = " + JSON.stringify(res);
}

module.exports = processMappings