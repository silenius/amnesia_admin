import { readonly } from 'vue'

export const yes_no = readonly({
    true: {
      icon: 'fa-solid fa-square-check',
      class_: 'text-green-500 hover:text-green-600',
    },
    false: {
      icon: 'fa-solid fa-square-xmark',
      class_: 'text-red-500 hover:text-red-600',
    },
})

export const yes_no_unknown = readonly({
    ...yes_no,
    null: {
      icon: 'fa-solid fa-square-virus',
      class_: 'text-sky-500 hover:text-sky-600',
    }
})
