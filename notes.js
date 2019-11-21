const fs = require('fs');
const chalk = require('chalk');

// Adds a note to the JSON file
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('This title is already taken!'));
  }
};

// Removes a note from the JSON file
const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length !== notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

// Lists all notes inside the JSON file
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse(' Your notes: '));

  notes.forEach(note => {
    console.log('\n', chalk.blue.inverse(` ${note.title} `));
  });
};

// Displays a note's body
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.green.inverse(` ${note.title} `));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

// Returns an array of note objects
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

// Saves an array of note objects to the JSON file
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
