const cors = require('cors');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'https://s.codepen.io'
}));

app.use('/dist', express.static('dist'));
app.use('/demo', express.static('demo'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});