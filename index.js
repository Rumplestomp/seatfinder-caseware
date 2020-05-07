const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
// const fs = require('fs');
const mockData = require('./MOCK_DATA.json');

const { validateFname, capitalizeFirstLetter } = require('./util')


app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

// light logging
app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("origin")); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/**
 * This lenient search will find all employees who have similarly matching first and last names
 */
app.get('/employees', (req, res, next) => {
  let fname = req.query.fname || ''
  console.log("fname:", fname);
  // first and/or last will be undefined if input wasn't valid/no last name given
  let [first, last] = validateFname(decodeURIComponent(fname))

  if (!first) {
    res.status(400).end("Invalid Input")
  }
  // search json for matches
  let matches = mockData.filter(employee => {
    if (last){
      return employee.first_name.includes(capitalizeFirstLetter(first))
        && employee.last_name.includes(capitalizeFirstLetter(last))
    }
    else {
      return employee.first_name.includes(capitalizeFirstLetter(first));
    }
  })
  console.log("matches:", matches)
  return res.status(200).json(matches)
});
/**
 * This endpoint will return a single employee
 */
app.get('/employees/:id', (req, res, next) => {
  let id = parseInt(req.params.id);
  let matches = mockData.filter(employee => {
    return employee.id === id;
  })
  if (matches.length === 0) {
    res.status(404).end(`No employee with id: ${id} found.`)
  }
  return res.status(200).json(matches[0])
})

app.listen(3001);