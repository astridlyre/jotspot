import STORE from './store.js'

const $id = target => document.getElementById(target)
const $all = target => document.querySelectorAll(target)

const DOM = {
  createEl({
    type,
    innerText = null,
    innerHTML = null,
    classes = [],
    id = null,
    children = [],
    hidden = false,
  }) {
    const El = document.createElement(type)
    if (innerText) El.innerText = innerText
    if (innerHTML) El.innerHTML = innerHTML
    if (classes) El.classList.add(...classes)
    if (children) children.forEach(child => El.appendChild(child))
    if (id) El.id = id
    if (hidden) El.hidden = true
    return El
  },
}

const UI = {
  menuBtn: $id('menu-btn'),
  navBar: $id('nav-bar'),
  searchBtn: $id('search-btn'),
  searchInput: $id('search-input'),
  cancelSearchBtn: $id('cancel-search-btn'),
  gridBtn: $id('grid-btn'),
  listBtn: $id('list-btn'),
  settingsBtn: $id('settings-btn'),
  userBtn: $id('user-btn'),
  notesBtn: $id('notes-btn'),
  importantBtn: $id('important-btn'),
  trashBtn: $id('trash-btn'),
  pinnedNotes: $id('pinned-notes'),
  notes: $id('notes'),
  render(note) {
    this.pinnedNotes.appendChild(note)
  },
  clearSearch() {
    this.searchInput.value = ''
  },
  displayGrid() {
    this.pinnedNotes.classList.remove('flex', 'flex-col', 'items-center')
    this.pinnedNotes.classList.add('grid', 'grid-cols-3', 'gap-x-4', 'gap-y-4')
  },
  displayList() {
    this.pinnedNotes.classList.add('flex', 'flex-col', 'items-center')
    this.pinnedNotes.classList.remove(
      'grid',
      'grid-cols-3',
      'gap-x-4',
      'gap-y-4'
    )
  },
  toggleNavBar() {
    if (STORE.navBarHidden) {
      this.navBar.classList.remove('nav-bar-hidden')
      STORE.toggleNavBarState()
    } else {
      this.navBar.classList.add('nav-bar-hidden')
      STORE.toggleNavBarState()
    }
  },
}

const NOTE_FORM = {
  noteForm: $id('note-form'),
  noteMask: $id('note-mask'),
  noteCancelContainer: $id('note-cancel-container'),
  noteToolbar: $id('note-toolbar'),
  noteTitle: $id('note-title-input'),
  noteBody: $id('note-body-input'),
  cancelBtn: $id('note-cancel-btn'),
  createBtn: $id('note-create-btn'),
  colorPickers: [
    $id('color-gray'),
    $id('color-yellow'),
    $id('color-red'),
    $id('color-blue'),
    $id('color-indigo'),
    $id('color-green'),
    $id('color-teal'),
    $id('color-pink'),
  ],

  clearInputs() {
    this.noteTitle.value = ''
    this.noteBody.innerText = ''
  },

  expand() {
    this.noteCancelContainer.classList.add('flex')
    this.noteCancelContainer.classList.remove('hidden')
    this.noteTitle.hidden = false
    this.noteToolbar.classList.remove('hidden')
    this.noteToolbar.classList.add('flex')
    this.noteMask.classList.remove('hidden')
  },

  contract() {
    this.noteCancelContainer.classList.remove('flex')
    this.noteCancelContainer.classList.add('hidden')
    this.noteTitle.hidden = true
    this.noteToolbar.classList.add('hidden')
    this.noteToolbar.classList.remove('flex')
    this.noteMask.classList.add('hidden')
  },

  cancel() {
    this.contract()
    this.clearInputs()
  },
}

const ICONS = {
  important: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  del: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
}

const COLOR_PICKER = id => `<label for="color-gray-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-gray-${id}"
    class="hidden"
    value="text-gray-800 border-gray-800 bg-gray-800"
    checked
  />
  <span class="color-btn inline-block bg-gray-800" tabindex="0"></span>
</label>
<label for="color-yellow-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-yellow-${id}"
    class="hidden"
    value="text-yellow-800 border-yellow-800 bg-yellow-800"
  />
  <span class="color-btn inline-block bg-yellow-800" tabindex="0"></span>
</label>
<label for="color-red-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-red-${id}"
    class="hidden"
    value="text-red-800 border-red-800 bg-red-800"
  />
  <span class="color-btn inline-block bg-red-800" tabindex="0"></span>
</label>
<label for="color-blue-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-blue-${id}"
    class="hidden"
    value="text-blue-800 border-blue-800 bg-blue-800"
  />
  <span class="color-btn inline-block bg-blue-800" tabindex="0"></span>
</label>
<label for="color-indigo-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-indigo-${id}"
    class="hidden"
    value="text-indigo-800 border-indigo-800 bg-indigo-800"
  />
  <span class="color-btn inline-block bg-indigo-800" tabindex="0"></span>
</label>
<label for="color-green-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-green-${id}"
    class="hidden"
    value="text-green-800 border-green-800 bg-green-800"
  />
  <span class="color-btn inline-block bg-green-800" tabindex="0"></span>
</label>
<label for="color-teal-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-teal-${id}"
    class="hidden"
    value="text-teal-800 border-teal-800 bg-teal-800"
  />
  <span class="color-btn inline-block bg-teal-800" tabindex="0"></span>
</label>
<label for="color-pink-${id}">
  <input
    type="radio"
    name="color-pickers-${id}"
    id="color-pink-${id}"
    class="hidden"
    value="text-pink-800 border-pink-800 bg-pink-800"
  />
  <span class="color-btn inline-block bg-pink-800" tabindex="0"></span>
</label>`

export { DOM, UI, NOTE_FORM, ICONS, COLOR_PICKER, $id, $all }
