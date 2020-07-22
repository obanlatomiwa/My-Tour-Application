const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

//listening to server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
