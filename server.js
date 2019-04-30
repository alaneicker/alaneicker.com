const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const model = require('yamljs').load('content.yml');

app.set('view engine', 'vash');
app.set('views', `${__dirname}/src/views`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  model.copyrightYear = new Date().getFullYear();
  res.render('index', model);
});

module.exports = app.listen(port, () => {
  console.log(`Node server is running in ${env} mode on port ${port}`);
});
