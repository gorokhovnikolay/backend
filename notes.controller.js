const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const pathNotes = path.join(__dirname, "db.json");

async function addNotes(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile("./db.json", JSON.stringify(notes));
  console.log(chalk.bgCyan("Notes addided!!!"));
}

async function getNotes() {
  const notes = await fs.readFile(pathNotes, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNotes(id) {
  const notes = await getNotes();

  const filterNotes = notes.filter((note) => note.id !== id);

  if (filterNotes.length === notes.length) {
    console.log(chalk.bgBlack("ID is not find!!!"));
    return;
  }

  await fs.writeFile(pathNotes, JSON.stringify(filterNotes));
  console.log(chalk.bgCyan("Remove assets!!!"));
}

async function presentList() {
  const notes = await getNotes();
  console.log(chalk.bgGreenBright("All notes:"));
  notes.forEach((note) => {
    console.log(chalk.bgBlue(note.title), chalk.bgMagenta(note.id));
  });
}

module.exports = {
  addNotes,
  presentList,
  removeNotes,
};
