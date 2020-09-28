import { NOTE_FORM as nf, UI } from './dom.js'
import Note from './note.js'
import STORE from './store.js'

const jot = {
  addNote() {
    const colors = nf.colorPickers
      .find(picker => picker.checked)
      .value.split(' ')
    const noteObj = {
      title: nf.noteTitle.value,
      body: nf.noteBody.innerText,
      id: null,
      color: {
        text: colors[0],
        border: colors[1],
        bg: colors[2],
      },
    }
    const newNote = new Note(noteObj)
    nf.clearInputs()
    UI.render(newNote.render())
    STORE.saveNote({ ...noteObj, id: newNote.id })
  },
  populateNotes() {
    STORE.getNotes().forEach(note => {
      const noteToRender = new Note(note)
      UI.pinnedNotes.appendChild(noteToRender.render())
    })
  },
  populateImportant() {
    STORE.getNotes().forEach(note => {
      if (note.isImportant) {
        const noteToRender = new Note(note)
        UI.pinnedNotes.appendChild(noteToRender.render())
      }
    })
  },
  deleteNote(id) {
    STORE.deleteNote(id)
  },
  deleteNotes() {
    STORE.deleteAll()
    this.clearNotes()
  },
  updateNote(note) {
    STORE.updateNote(note)
    this.clearNotes()
    if (STORE.filterByImportant) {
      this.populateImportant()
    } else {
      this.populateNotes()
    }
  },
  searchByText(event) {
    const query = event.target.value
    this.clearNotes()
    STORE.getNotes().forEach(note => {
      if (note.title.includes(query) || note.body.includes(query)) {
        const noteToRender = new Note(note)
        UI.pinnedNotes.appendChild(noteToRender.render())
      }
    })
  },
  filterByImportant() {
    STORE.setFilterByImportant()
    this.clearNotes()
    this.populateImportant()
  },
  filterAll() {
    STORE.setFilterByImportant(false)
    this.clearNotes()
    this.populateNotes()
  },
  clearSearch() {
    UI.clearSearch()
    this.clearNotes()
    this.populateNotes()
  },
  clearNotes() {
    while (UI.pinnedNotes.firstChild) {
      UI.pinnedNotes.removeChild(UI.pinnedNotes.firstChild)
    }
  },
  loader() {
    this.populateNotes()
    const savedDisplay = localStorage.getItem('display')
    if (!savedDisplay || savedDisplay === 'list') {
      UI.displayList()
      STORE.setDisplay('list')
    } else {
      UI.displayGrid()
      STORE.setDisplay('grid')
    }
  },
}

// register event handlers
document.onload = jot.loader()
document.onkeyup = event => {
  switch (event.key) {
    case '/':
      return UI.searchInput.focus()
    case '\\':
      return nf.noteBody.focus()
    default:
      return
  }
}
UI.searchBtn.onclick = () => UI.searchInput.focus()
nf.noteBody.onfocus = () => nf.expand()
nf.noteMask.onclick = () => nf.contract()
nf.createBtn.onclick = () => jot.addNote()
nf.cancelBtn.onclick = () => nf.cancel()
UI.menuBtn.onclick = () => UI.toggleNavBar()
UI.searchBtn.onclick = () => UI.searchInput.focus()
UI.searchInput.onkeydown = event => jot.searchByText(event)
UI.cancelSearchBtn.onclick = () => jot.clearSearch()
UI.gridBtn.onclick = () => {
  if (STORE.display === 'list') {
    UI.displayGrid()
    STORE.setDisplay('grid')
  }
}
UI.listBtn.onclick = () => {
  if (STORE.display === 'grid') {
    UI.displayList()
    STORE.setDisplay('list')
  }
}
UI.settingsBtn.onclick = null
UI.userBtn.onclick = null
UI.notesBtn.onclick = () => jot.filterAll()
UI.importantBtn.onclick = () => jot.filterByImportant()
UI.trashBtn.onclick = () => jot.deleteNotes()

export default jot
