const express = require('express');

// setting up express app
const app = express();

// setting up server

app.get('/', (req, res) => {
  res.status(200).send(`listening on port ${port}`);
});

const port = 8000;

app.listen(port, () => {
  console.log('hello world');
});
