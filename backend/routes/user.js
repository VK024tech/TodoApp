//  start writing your code from here
const express = require("express");
const router = express.Router();
const fs = require("fs");
const dataPath = "./data.txt";
const jwt = require("jsonwebtoken");
const JWT_SECRET = "soullesssoul";
const {UserModel, TodoModel} = require("../db")


router.use(express.json());

router.post("/SignUp", (req, res, next) => {
  let userData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const NewUserData = req.body;
  let userName = NewUserData.userName;
  let userEmail = NewUserData.userEmail;
  let userPassword = NewUserData.userPassword;

  const userExists = userData.some(
    (curr) => curr.userName === userName && curr.userEmail === userEmail
  );

  try {
    if (userExists) {
      res.status(403).send({
        message: "Looks like you already have an Account! Sign in!",
      });
    } else if (userName && userEmail && userPassword) {
      const token = jwt.sign(
        { userName: userName, userEmail: userEmail },
        JWT_SECRET
      );

   



      fs.writeFileSync(dataPath, JSON.stringify([...userData, NewUserData]));
      res.send({ token: token, message: "You're Signed up!" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
});

router.post("/SignIn", (req, res, next) => {
  let userData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const signUserData = req.body;
  // console.log(signUserData)
  userName = signUserData.userName;
  userEmail = signUserData.userEmail;
  userPassword = signUserData.userPassword;

  const userExists = userData.some(
    (curr) =>
      (curr.userName === userName && curr.userPassword === userPassword) ||
      (curr.userEmail === userEmail && curr.userPassword === userPassword)
  );

  // console.log(userExists)
  // console.log(userData)

  try {
    if (userExists) {
      const token = jwt.sign(
        { userName: userName, userEmail: userEmail },
        JWT_SECRET
      );

      console.log(token);


      // fs.writeFileSync(dataPath, JSON.stringify([...userData, NewUserData]));
      res.send({ token: token, message: "You're Signed In!" });
    } else {
      res.status(403).send({
        message: "Sorry, Incorrect credentials! Try again or signUp",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
});

module.exports.router = router;
// module.exports.JWT_SECRET = JWT_SECRET;
