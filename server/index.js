import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 5000;

// ---------- DATABASE ----------
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB error", err));

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- ROUTES ----------

// GET all todos
app.get("/api/todos", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, list FROM to_do_list ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// ADD new todo
app.post("/api/todos", async (req, res) => {
  const { list } = req.body;

  if (!list || !list.trim()) {
    return res.status(400).json({ error: "Todo cannot be empty" });
  }

  try {
    const result = await db.query(
      "INSERT INTO to_do_list (list) VALUES ($1) RETURNING id, list",
      [list]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// DELETE todo
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM to_do_list WHERE id = $1", [id]);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// ---------- SERVER ----------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
