//  start writing your code from here
const express = require("express");
const userImport = require("./user");
const todo = express.Router();
const fs = require("fs");
const dataPath = "./data.txt";
const jwt = require("jsonwebtoken");
let savedData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const JWT_SECRET = "soullesssoul";

let getTodo = "";

todo.use(express.json());

authentication = (req, res, next) => {
  const token = req.headers.token;
  const newToken = token.replaceAll('"', '')
  // console.log(token);
  const userDetails = jwt.verify(newToken, JWT_SECRET);
  if(!token){
    res.status(401).send({ message: "authorization failed!" });
  }

  try {
    req.body.userDetails = userDetails;
    console.log(userDetails);
    next()
  } catch (error) {
    
  }
};

todo.get("/todolist", authentication, (req, res, next) => {
  let userData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const UserTodoData = userData;
  userDetails = req.body.userDetails;
  console.log(userDetails);
  userName = userDetails.userName;
  userEmail = userDetails.userEmail;
  userPassword = userDetails.userPassword;

  const userExists = userData.some(
    (curr) =>
      (curr.userName === userName && curr.userPassword === userPassword) ||
      (curr.userEmail === userEmail && curr.userPassword === userPassword)
  );

  res.send("nicee");
});

module.exports = todo;
