const EXPRESS = require('express');
const ROUTER = express.Router();

// Root GET route
app.get('/', (req, res) {
  res.send('Welcome to the election application!')
});

// I'm funny, I know.
app.delete('/', (req, res) {
  res.send("Please don't try to delete the entire site. That's not cool");
});
