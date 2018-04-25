var glob = require('glob');

const cors = require('cors');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'https://s.codepen.io'
}));

app.get('/', (req, res) =>{

  glob('demo/*.html', function(err, files) {
    console.log(files);
    const list = files.map(file => `<li><a href="${file}">${file}</a></li>`)
    const content = `<ul>${list.join('')}</ul>`
    res.send(content)
  });

});

app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));
app.use('/demo', express.static('demo'));
app.use('/node_modules', express.static('node_modules'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});