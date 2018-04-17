import glob from "glob";
import {promisify} from "bluebird";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const fetchMaterial = promisify((done) => glob("./node_modules/@material/**/index.js", {}, done));
const kebabToCamel = (kebab) => kebab.replace(/(^\w|-\w)/g, (m) =>  m.substr(m.length - 1).toUpperCase())

export default fetchMaterial()
  .then((files) => {
    console.log(files)
    return files.map(file => {
      const name = file.split('/')[3]
      return {
        input: file,
        output: {
          file: 'src/' + name + "/Material" + kebabToCamel(name) + 'Behaviour.js',
          format: 'es'
        },
        plugins: [
          nodeResolve(),
          commonjs()
        ]
      }
    });
  });