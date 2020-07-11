const app = require('./app');

//listening to server
const port = 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
