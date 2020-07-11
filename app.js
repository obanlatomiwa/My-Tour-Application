// core modules
const fs = require('fs');

// 3rd-party modules
const express = require('express');

// setting up express app
const app = express();

// app middleware
app.use(express.json());

// loading data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'));

// setting up server
// get method
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// post method
app.post('/api/v1/tours', (req, res) => {
  newID = tours[tours.length - 1].id + 1;
  newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  // push to file
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

const port = 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
