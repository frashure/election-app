var express = require('express');
  app = express();
  port = process.env.PORT || 3000;

path = require('path');

console.log('Election App RESTful API server started on: ' + port);

var indexPath = path.join(__dirname, '../src/');

app.use(express.static(indexPath));

app.delete('/', (req, res) => res.send("Please don't try deleting the entire site. That's not cool."));

app.listen(port);
