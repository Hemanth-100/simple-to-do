import express from "express";
const router = express.Router();

// Example data
const todos = ["Learn React", "Build ToDo App", "Connect Backend"];

router.get("/todos", (req, res) => {
  res.json(todos);
});

export default router;
