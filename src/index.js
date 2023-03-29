const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const studentArray = require("./InitialData");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

// Endpoint to get all students
app.get("/api/student", (req, res) => {
  res.json(studentArray);
});

// Endpoint to get a student by id
app.get("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = studentArray.find((value) => value.id === id);
  if (student) {
    res.json(student);
  } else {
    res.sendStatus(404);
  }
});

// Endpoint to add a new student
let nextId = studentArray.length + 1;
app.post("/api/student", (req, res) => {
  const { name, currentClass, division } = req.body;
  if (!name || !currentClass || !division) {
    res.sendStatus(400);
  } else {
    const newStudent = {
      id: nextId++,
      name: name,
      currentClass: currentClass,
      division: division,
    };
    studentArray.push(newStudent);
    res.json({ id: newStudent.id });
  }
});

// Endpoint to update a student
app.put("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const student = studentArray.find((value) => value.id === id);
  if (!student) {
    res.sendStatus(404);
  } else if (!name) {
    res.sendStatus(400);
  } else {
    student.name = name;
    res.sendStatus(200);
  }
});

// Endpoint to delete a student
app.delete("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = studentArray.findIndex((value) => value.id === id);
  if (index !== -1) {
    studentArray.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
