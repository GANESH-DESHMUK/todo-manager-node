const { request, response } = require('express')
const express = require('express')
const app = express()

app.get("/todos", (request, response) => {
  //response.send("Hello World");
  console.log("Todo List")
})
app.post("/todos", (request, response) => {
  console.log("Creating a Todo", request.body)
})

app.put("/todos/:id/markAsCompleted", (request, response) => {
  console.log("We have to update a todo with ID:", request.params.id)
})
app.delete("/todos/:id", (request, response) => {
  console.log("Delete a todo by ID:", request.params.id)
})
app.listen(3000, () => {
  console.log("Started express server at port 3000")
})
