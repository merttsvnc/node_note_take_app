const fs = require('fs')
const chalk = require('chalk')
const fileOperations = require('./fileOperations')

const addNote = (title, body) => {
  try {
    const notes = fileOperations.loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
      notes.push({
        title,
        body,
      })
      fileOperations.saveNotes(notes)
      console.log(chalk.green.inverse('New note added!'))
    } else {
      console.log(chalk.red.inverse('Note title taken!'))
    }
  } catch (error) {
    console.error(
      chalk.red.inverse('An error occurred while adding a note:', error.message)
    )
  }
}

// removeNote
const removeNote = (title) => {
  const notes = fileOperations.loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'))
    fileOperations.saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

// listNotes
const listNotes = () => {
  const notes = fileOperations.loadNotes()
  console.log(chalk.inverse('Your notes'))
  notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
  const notes = fileOperations.loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
}
