import { readonly } from 'vue'

export const actions = readonly([
  {
    label: 'Edit',
    event: 'edit-content',
    icon: 'fa-solid fa-pen-to-square',
    class: (active) => active ? 'bg-violet-500 text-white' : 'text-gray-900',
    enabled: (...args) => true
  }, {
    label: 'Delete',
    event: 'delete-content',
    icon: 'fa-solid fa-trash-can',
    class: (active) => active ? 'bg-red-700 text-white' : 'text-red-700',
    enabled: (...args) => true
  }
])