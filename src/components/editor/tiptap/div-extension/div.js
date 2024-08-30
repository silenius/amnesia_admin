import { 
    Node,
    mergeAttributes
} from '@tiptap/core'

export const Div = Node.create({
  name: 'div',
  group: 'block',
  content: 'block*',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      { tag: 'div' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

})
