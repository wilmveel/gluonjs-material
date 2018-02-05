YAML = require('yamljs');

// parse YAML string
const nativeObject = YAML.load('../src/mappings/MaterialButton.yml');

console.log(JSON.stringify(nativeObject, null, 2))
