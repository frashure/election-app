var express = require('express');
  app = express();
  port = process.env.PORT || 3000;

app.listen(port);

console.log('Election App RESTful API server started on: ' + port);

app.get('/', (req, res) => res.send('Hello World!'));

app.delete('/', (req, res) => res.send("Please don't try deleting the entire site. That's not cool."));
