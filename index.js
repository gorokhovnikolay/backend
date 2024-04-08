const yargs = require("yargs");
const pkg = require("./package.json");
const { addNotes, presentList, removeNotes } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add note",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNotes(title);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNotes(id);
  },
});

yargs.command({
  command: "list",
  describe: "List note",
  async handler() {
    await presentList();
  },
});

yargs.parse();
