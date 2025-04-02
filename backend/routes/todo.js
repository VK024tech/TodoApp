//  start writing your code from here
const express = require("express");
const userImport = require("./user");
const todo = express.Router();
const fs = require("fs");
const dataPath = "./data.txt";
let savedData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

let getTodo = "";

todo.use(express.json());

todo.put("/todolist/:email", (req, res, next) => {
  const data = req.body;
  const getTodo = data.todo;
  const userEmail = req.params.email; 

  console.log(getTodo);
  console.log(userEmail);

  const userIndex = savedData.findIndex((curr) => curr.userEmail === userEmail);

  if (userIndex !== -1) { 
    if (!savedData[userIndex].todo) {
      savedData[userIndex].todo = []; 
    }
    savedData[userIndex].todo.push(getTodo);

    try {
      fs.writeFileSync(dataPath, JSON.stringify(savedData));
      console.log(data);
      res.send({ response: "Todo updated" });
    } catch (err) {
      console.error("Error writing to file:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

module.exports = todo;
