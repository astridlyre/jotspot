import { COLOR_PICKER, DOM, ICONS } from './dom.js'
import jot from './index.js'

class Note {
  constructor({ title, body, id = null, color = null, isImportant }) {
    this.id = id || `${new Date().getTime()}`
    this.color = color
    this.title = title
    this.body = body
    this.isEditing = false
    this.isImportant = isImportant
    this.importantBtn = DOM.createEl({
      type: 'button',
      innerHTML: ICONS.important,
      classes: ['btn', `${isImportant && this.color?.bg}`],
    })
    this.editBtn = DOM.createEl({
      type: 'button',
      innerHTML: ICONS.edit,
      classes: ['btn'],
    })
    this.delBtn = DOM.createEl({
      type: 'button',
      innerHTML: ICONS.del,
      classes: ['btn'],
    })
    this.colorPicker = DOM.createEl({
      type: 'div',
      innerHTML: COLOR_PICKER(this.id),
      classes: ['flex', 'items-center', 'mx-4', 'hidden', 'flex-wrap', 'mt-2'],
    })
    this.container = DOM.createEl({
      type: 'div',
      classes: ['w-full', 'flex', 'justify-end', 'flex-wrap'],
      children: [
        this.colorPicker,
        this.importantBtn,
        this.editBtn,
        this.delBtn,
      ],
    })
    this.titleEl = DOM.createEl({
      type: 'h6',
      innerText: title,
      classes: [this.color?.text],
    })
    this.bodyEl = DOM.createEl({
      type: 'p',
      innerText: body,
      classes: ['flex-grow'],
    })
    this.editMask = DOM.createEl({
      type: 'div',
      classes: ['inset-0', 'fixed', 'z-minus'],
      hidden: true,
    })
    this.liEl = DOM.createEl({
      type: 'li',
      classes: ['note', 'relative', this.color?.border],
      children: [this.editMask, this.titleEl, this.bodyEl, this.container],
      id: this.id,
    })
  }
  me() {
    return {
      title: this.title,
      body: this.body,
      id: this.id,
      color: this.color,
      isImportant: this.isImportant,
    }
  }
  render() {
    this.importantBtn.addEventListener('click', () => {
      this.isImportant = !this.isImportant
      this.toggleImportant()
    })
    this.editBtn.addEventListener('click', () => {
      this.isEditing = !this.isEditing
      this.edit()
    })
    this.delBtn.addEventListener('click', () => {
      jot.deleteNote(this.id)
      this.liEl.remove()
    })
    return this.liEl
  }
  toggleImportant() {
    if (this.isImportant) {
      jot.updateNote({
        ...this.me(),
        isImportant: true,
      })
      this.importantBtn.classList.add(this.color.bg)
    } else {
      jot.updateNote({
        ...this.me(),
        isImportant: false,
      })
      this.importantBtn.classList.remove(this.color.bg)
    }
  }
  edit() {
    if (this.isEditing) {
      this.editMask.hidden = false
      this.editMask.addEventListener('click', () => {
        this.isEditing = false
        this.edit()
      })
      this.titleEl.contentEditable = true
      this.bodyEl.contentEditable = true
      this.colorPicker.classList.remove('hidden')
      this.bodyEl.focus()
      this.liEl.classList.add('bg-gray-700', 'bg-opacity-25', 'z-30')
      document.execCommand('selectAll')
    } else {
      this.editMask.hidden = true
      this.editMask.removeEventListener('click', () => {
        this.isEditing = false
        this.edit()
      })
      const [text, border, bg] = [
        ...this.colorPicker.querySelectorAll('input:checked'),
      ][0].value.split(' ')
      this.titleEl.contentEditable = false
      this.bodyEl.contenteEditable = false
      this.colorPicker.classList.add('hidden')
      this.title = this.titleEl.innerText
      this.body = this.bodyEl.innerText
      this.liEl.classList.remove('bg-gray-700', 'bg-opacity-25', 'z-30')
      window.getSelection().removeAllRanges()
      jot.updateNote({
        ...this.me(),
        color: {
          text,
          border,
          bg,
        },
      })
    }
    return
  }
}

export default Note
