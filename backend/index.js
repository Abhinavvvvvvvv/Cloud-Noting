//Connected MongoDB with db.js
const connectToMongo = require("./db");
connectToMongo();

//Added express and it's PORT
const express = require("express");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

// Available Routes
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");

// API path
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
