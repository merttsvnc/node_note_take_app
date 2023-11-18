const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  try {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
      notes.push({
        title,
        body,
      })
      saveNotes(notes)
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

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    console.error(chalk.yellow.inverse('Unable to load notes:', error.message))
    return []
  }
}

const saveNotes = (notes) => {
  try {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
  } catch (error) {
    console.error(
      chalk.red.inverse('An error occurred while saving notes:', error.message)
    )
  }
}

// removeNote
const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

// listNotes
const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.inverse('Your notes'))
  notes.forEach((note) => console.log(note.title))
}

const readNotes = (title) => {
  const notes = loadNotes()
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
  readNotes,
}
