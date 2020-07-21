const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const app = require('./app');


//listening to server
const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


const x = 23;
x = 34;

