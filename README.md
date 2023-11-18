# Simple Note-Taking App

This is a simple note-taking application that runs in the terminal. Users can add notes, remove notes, list notes, and read a specific note.

## Installation

1. Clone this project:

   ```bash
   git clone https://github.com/merttsvnc/node_note_take_app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd note-app
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

## Usage

The application runs in the terminal and includes the following commands:

- To add a note:

  ```bash
  node app.js add --title="Title" --body="Note content"
  ```

- To remove a note:

  ```bash
  node app.js remove --title="Title"
  ```

- To list all notes:

  ```bash
  node app.js list
  ```

- To read a specific note:

  ```bash
  node app.js read --title="Title"
  ```

**Note:** The default notes file name is set to "notes.json."

## Tips and Improvements

- [ ] Add a feature to categorize notes.
- [ ] Add a feature to sort notes by date.
- [ ] Enhance security controls.

## Contributing

If you want to contribute to this project, please open an issue or submit a pull request.
