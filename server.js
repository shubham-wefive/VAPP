const express = require('express');
const env = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

const connection = require('./db');
const indexRouter = require('./routes/indexRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connection();

app.use('/vapp/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT+'/vapp/v1');
});
