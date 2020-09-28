const STORE = {
  notes: [],
  noteEls: [],
  user: null,
  display: null,
  navBarHidden: true,
  filterByImportant: false,
  saveNote(note) {
    this.notes = this.notes.concat(note)
    localStorage.setItem('notes', JSON.stringify(this.notes))
    return this.notes
  },
  updateNote(note) {
    this.notes = this.notes.map(n => (n.id === note.id ? note : n))
    localStorage.setItem('notes', JSON.stringify(this.notes))
    return this.notes
  },
  getNotes() {
    const rawNotes = localStorage.getItem('notes')
    if (!rawNotes) return []
    this.notes = JSON.parse(rawNotes)
    return this.notes
  },
  deleteNote(id) {
    this.notes = this.notes.filter(note => note.id !== id)
    localStorage.setItem('notes', JSON.stringify(this.notes))
  },
  deleteAll() {
    this.notes = []
    localStorage.setItem('notes', JSON.stringify(this.notes))
  },
  setDisplay(str) {
    this.display = str
    localStorage.setItem('display', this.display)
  },
  toggleNavBarState() {
    this.navBarHidden = !this.navBarHidden
  },
  setFilterByImportant(val = true) {
    this.filterByImportant = val
  },
}

export default STORE
