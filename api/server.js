var express = require('express');
  app = express();
  port = process.env.PORT || 3000;

app.listen(port);

console.log('Election App RESTful API server started on: ' + port);
