const { expect } = require('chai')
const mock = require('mock-fs')
const sinon = require('sinon')
const fs = require('fs')
const chalk = require('chalk')
const stripAnsi = require('strip-ansi')
const { addNote, removeNote, listNotes, readNote } = require('../notes')

describe('addNote', () => {
  afterEach(() => {
    mock.restore() // Restore the file system after each test
  })

  it('should add a new note', () => {
    // Arrange
    const title = 'Test Title'
    const body = 'Test Body'

    // Configure the mock file system
    mock({
      'notes.json': '[]', // Create an empty notes.json file
    })

    // Act
    addNote(title, body)

    // Assert
    // Read notes from the mock file system
    const notes = JSON.parse(fs.readFileSync('notes.json'))

    const addedNote = notes.find((note) => note.title === title)

    expect(addedNote).to.exist
    expect(addedNote.body).to.equal(body)
  })

  it('should remove a note', () => {
    // Arrange
    const titleToRemove = 'Test Title'
    const notesData = [
      { title: 'Existing Note', body: 'Existing Body' },
      { title: titleToRemove, body: 'Note to remove' },
    ]

    // Configure the mock file system
    mock({
      'notes.json': JSON.stringify(notesData),
    })

    // Act
    removeNote(titleToRemove)

    // Assert
    // Read notes from the mock file system
    const notes = JSON.parse(fs.readFileSync('notes.json'))

    const removedNote = notes.find((note) => note.title === titleToRemove)

    expect(removedNote).to.not.exist
  })

  it('should list all notes', () => {
    // Arrange
    const notesData = [
      { title: 'Note 1', body: 'Body 1' },
      { title: 'Note 2', body: 'Body 2' },
    ]

    // Configure the mock file system
    mock({
      'notes.json': JSON.stringify(notesData),
    })

    // Act
    // Use a spy to capture the console.log output
    const consoleSpy = sinon.spy(console, 'log')
    listNotes()

    // Assert
    // Check if the console.log was called for each note
    expect(consoleSpy.calledWith('Note 1')).to.be.true
    expect(consoleSpy.calledWith('Note 2')).to.be.true

    // Restore the spy
    consoleSpy.restore()
  })

  it('should read a specific note', () => {
    // Arrange
    const titleToRead = 'Test Title'
    const bodyToRead = 'Test Body'
    const notesData = [{ title: titleToRead, body: bodyToRead }]

    // Configure the mock file system
    mock({
      'notes.json': JSON.stringify(notesData),
    })

    // Act
    // Use a spy to capture the console.log output
    const consoleSpy = sinon.spy(console, 'log')
    readNote(titleToRead)

    // Assert
    // Check if the console.log was called with the expected title and body
    expect(stripAnsi(consoleSpy.getCall(0).args[0])).to.equal(titleToRead)
    expect(consoleSpy.calledWith(bodyToRead)).to.be.true

    // Restore the spy
    consoleSpy.restore()
  })

  // Add tests for setFileName function
})
