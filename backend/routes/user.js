//  start writing your code from here
const express = require("express");
const router = express.Router();
const fs = require("fs");
const dataPath = "./data.txt";

let userName = "";
let userEmail = "";
let userPassword = "";
let userData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// function checkData(data){

// }

router.use(express.json());

router.post("/SignUp", (req, res, next) => {
  const data = req.body;
  userName = data.userName;
  userEmail = data.userEmail;
  userPassword = data.userPassword;


  const userExists = userData.some(
    (curr) => curr.userName === userName && curr.userEmail === userEmail
  );

  if (userExists) {
    return res
      .status(409)
      .send({ response: "You already have an account, Please signIn!" });
  }
  fs.writeFileSync(dataPath, JSON.stringify([...userData, data]));
  res.send({ response: "SignUp Succesfull" });
});

router.post("/SignIn", (req, res, next) => {
  const data = req.body;
  userName = data.userName;
  userPassword = data.userPassword;
  userEmail = data.userEmail;

  const userExists = userData.some(
    (curr) =>
      (curr.userName === userName && curr.userPassword === userPassword) ||
      (curr.userEmail === userEmail && curr.userPassword === userPassword)
  );

  if (!userExists) {
    return res
      .status(409)
      .send({ response: "Sorry, Incoorect credentials! Try again or signUp" });
  } else {
    // fs.writeFileSync(dataPath, JSON.stringify([...userData, data]));
    res.send({ response: "SignIn Succesfull" });
  }
});

module.exports = router;


