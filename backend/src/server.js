const pool = require("../database/db");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//get all the tasks
app.get("/api/task", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

//add task
app.post("/api/task", async (req, res) => {
  try {
    const { title, desc } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks(title,description,completed) VALUES($1,$2,false) RETURNING *",
      [title, desc],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
});

//update task
app.put("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, completed } = req.body;
    const response = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    const data = res.json(response.rows);
    const sql = await pool.query(
      "UPDATE tasks SET title=$1, description=$2,completed=$3 WHERE id=$4 ",
      [title, desc, completed, id],
    );
  } catch (error) {}
});

//Delete Task
app.delete("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = await pool.query("DELETE FROM tasks WHERE id=$1",[id]);
    res.json(sql);
  } catch (error) {}
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
