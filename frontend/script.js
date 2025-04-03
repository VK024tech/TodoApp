//  start from here
// import axios from "axios";

const userNameSignup = document.getElementById("SignUpUser");
const userEmailSignup = document.getElementById("SignUpEmail");
const userPasswordSignup = document.getElementById("SignUpPassword");
const userButtonSignUp = document.getElementById("buttonSignup");
const signInUsername = document.getElementById("signinUsername");
const signInUserPassword = document.getElementById("SigninUserPassword");
const signInButtonBig = document.getElementById("signinbutton");
const signInButton = document.getElementById("signin");
const SignUpButton = document.getElementById("SignUp");
const signUpError = document.getElementById("error");
const signInError = document.getElementById("error2");
const todoError = document.getElementById("error3");
const newTodo = document.getElementById("newTodo");
const addTodo = document.getElementById("addTodo");
const page1 = document.getElementById("page-1");
const page2 = document.getElementById("page-2");
const page3 = document.getElementById("page-3");
let NewUserName = "";
let NewUserEmail = "";
let NewUserPassword = "";
let signUserPassword = "";
let signUsername = "";
let signUserEmail = "";
let userNewTodo = "";

page1.style.display = "block";

newTodo.addEventListener("input", (event) => {
  userNewTodo = event.target.value;
  console.log(userNewTodo);
});
userNameSignup.addEventListener("input", (event) => {
  NewUserName = event.target.value;
  // console.log(userName)
});
userEmailSignup.addEventListener("input", (event) => {
  NewUserEmail = event.target.value;
  // console.log(userEmail)
});
userPasswordSignup.addEventListener("input", (event) => {
  NewUserPassword = event.target.value;
  // console.log(userPassword)
});
signInUsername.addEventListener("input", (event) => {
  if (event.target.value.toLowerCase().endsWith("@gmail.com")) {
    signUserEmail = event.target.value;
    // console.log('useremail:'+signUserEmail)
    return;
  }
  signUsername = event.target.value;
  // console.log(signUsername)
  // console.log(userPassword)
});
signInUserPassword.addEventListener("input", (event) => {
  signUserPassword = event.target.value;
  // console.log(userPassword)
});

userButtonSignUp.addEventListener("click", (event) => {
  if (NewUserName == "" || NewUserEmail == "" || NewUserPassword == "") {
    signUpError.style.display = "block";
    signUpError.innerHTML = "Please fill all the details";
  } else {
    // console.log('running')
    axios
      .post("http://localhost:4000/SignUp", {
        userName: NewUserName,
        userEmail: NewUserEmail,
        userPassword: NewUserPassword,
      })
      .then((response) => {
        console.log(response.data.token);
        sessionStorage.setItem("authKey", JSON.stringify(response.data.token));
        page1.style.display = "none";
        page2.style.display = "none";
        page3.style.display = "block";
      })
      .catch((error) => {
        signUpError.style.display = "block";
        signUpError.innerHTML = JSON.parse(error.request.response).message;
        // console.log(error.request);
      });
  }
});
signInButtonBig.addEventListener("click", (event) => {
  if ((signUsername == "" && signUserEmail == "") || signUserPassword == "") {
    signInError.style.display = "block";
    signInError.innerHTML = "Please fill all the details";
    // console.log('issue')
  } else {
    // console.log({
    //     userName: signUsername,
    //     userEmail: signUserEmail,
    //     userPassword: signUserPassword,
    //   })
    axios
      .post("http://localhost:4000/SignIn", {
        userName: signUsername,
        userEmail: signUserEmail,
        userPassword: signUserPassword,
      })
      .then((response) => {
        // console.log(response);
        sessionStorage.setItem("authKey", JSON.stringify(response.data.token));
        page1.style.display = "none";
        page2.style.display = "none";
        page3.style.display = "block";
      })
      .catch((error) => {
        // console.log(error)
        signInError.style.display = "block";
        signInError.innerHTML = JSON.parse(error.request.response).message;
        // console.log(error.request.response);
      });
  }
});

addTodo.addEventListener("click", async (event) => {
  const list = document.getElementById("todoList");
  const newdiv = document.createElement("div");
  // console.log(sessionStorage.getItem("authKey").replace(/""/g, ' '))

  try {
    const response = await axios.get(`http://localhost:4000/todolist`, {
      headers: { token: sessionStorage.getItem("authKey") },
    });
    console.log(response);
    page1.style.display = "none";
    page2.style.display = "none";
    page3.style.display = "block";
  } catch (error) {
    signInError.style.display = "block";
    if (error.response && error.response.status === 404) {
      signInError.innerHTML = "User not found";
    } else {
      signInError.innerHTML = "Failed to update todo list.";
    }
    console.error("PUT request failed:", error);
  }
});

signInButton.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "block";
  page3.style.display = "none";
});
SignUpButton.addEventListener("click", () => {
  page1.style.display = "block";
  page2.style.display = "none";
  page3.style.display = "none";
});

window.onbeforeunload = function () {
  sessionStorage.clear();
};
