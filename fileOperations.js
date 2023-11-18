const fs = require('fs')
const chalk = require('chalk')

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    console.error(chalk.yellow.inverse('Unable to load notes:', e.message))
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

module.exports = {
  loadNotes,
  saveNotes,
}
