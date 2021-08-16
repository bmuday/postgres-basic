const router = require("express").Router();
const pool = require("../db");

// get all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("select * from todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// get a todo
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("select * from todo where id=$1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error);
  }
});

// create a todo
router.post("/", async (req, res) => {
  const { description } = req.body;
  try {
    const newTodo = await pool.query(
      "insert into todo (description) values ($1) returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// update a todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedTodo = await pool.query(
      "update todo set description=$1 where id=$2",
      [description, id]
    );
    res.json({ message: `Todo ${id} has been updated.` });
  } catch (error) {
    console.log(error);
  }
});

// delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await pool.query("delete from todo where id=$1", [id]);
    res.json({ message: `Todo ${id} has been deleted.` });
  } catch (error) {
    console.log(error);
  }
});

// delete all
router.delete("/", async (req, res) => {
  try {
    const allDeleted = await pool.query("delete from todo");
    res.json({ message: `All todos have been deleted.` });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
