const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("morgan");

// Middlewares
app.use(express.json());
app.use(logger("tiny"));

// Routes
const todosRoute = require("./routes/todos");
app.use("/todos", todosRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
