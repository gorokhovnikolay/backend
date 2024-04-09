const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
  addNotes,
  getNotes,
  removeNotes,
  editNotes,
} = require("./notes.controller");

const basePath = path.join(__dirname, "site");
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "site");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express notes",
    notes: await getNotes(),
  });
});

app.post("/", async (req, res) => {
  await addNotes(req.body.title);
  res.render("index", { title: "Express notes", notes: await getNotes() });
});
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  removeNotes(id);
  res.render("index", { title: "Express notes", notes: await getNotes() });
});

app.put("/:id", async (req, res) => {
  await editNotes(req.body);
  res.render("index", { title: "Express notes", notes: await getNotes() });
});

app.listen(3000, () => {
  console.log(`Server start, port ${port}`);
});
