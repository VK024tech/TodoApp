const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const objectId = Schema.objectId;

const User = new Schema({
  email: String,
  password: String,
  name: String
})

const Todo = new Schema({
    userId: objectId,
    title: String,
    done: Boolean
})


const UserModel = mongoose.model('userData', User)
const TodoModel = mongoose.model('todoList', Todo)


module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}