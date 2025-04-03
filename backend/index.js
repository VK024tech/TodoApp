// start writing from here
const express = require('express');
const app = express();
const {router:userRoutes } = require('./routes/user')
const todo = require('./routes/todo')
const cors = require('cors')

app.use(cors())

app.use('/user', userRoutes);
app.use('/todo', userRoutes);
app.post('/SignUp', userRoutes);
app.post('/SignIn', userRoutes);
app.get("/todolist", todo);

app.get('/hola', (req, res, next)=>{
    res.send('hey how are you')
})

app.listen(4000)
