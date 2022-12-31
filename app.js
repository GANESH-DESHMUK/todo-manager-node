//const { request, response } = require('express')
const express = require('express')
const app = express()
const { Todo } = require("./models")
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  const allTodos = await Todo.getTodos();
  if (request.accepts("html")) {
    response.render("index", { allTodos });
  } else {
    response.json({ allTodos });
  }
});
app.get("/", function (request, response) {
  response.send("Hello World");
})

app.get("/todos", async function (request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE

  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.send(todos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.post("/todos", async (request, response) => {
  console.log("Creating a Todo", request.body)
  //Todo
  try {
    const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
    return response.json(todo)
  }
  catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }

})

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id)
  const todo = await Todo.findByPk(request.params.id)
  try {
    const updateTodo = await todo.markAsCompleted()
    return response.json(updateTodo)
  }
  catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})
app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
  try {
    const deleted = await Todo.destroy({ where: { id: request.params.id } });
    //await todo.delete();
    response.send(deleted ? true : false);

  }
  catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});


module.exports = app;
