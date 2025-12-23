<<<<<<< HEAD
   import express from 'express';
   import helmet from 'helmet';
   import cors from 'cors';
   //import routes from './routes';
   //import errorHandler from './middleware/errorHandler';
   import routes from "./routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);


app.listen(5000, () => console.log("Server running on port 5000"));
=======
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ---------- DATABASE ----------
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB connection error:", err));

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
  try {
    await db.query("DELETE FROM to_do_list WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// ---------- SERVER ----------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
>>>>>>> detached-work
