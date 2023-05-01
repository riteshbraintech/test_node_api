var express = require('express');
var apiRouter = require("./route/api");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


// api route
app.use('/api', apiRouter);

let PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
