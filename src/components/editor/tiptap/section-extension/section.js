import { 
    Node,
    mergeAttributes
} from '@tiptap/core'

export const Section = Node.create({
  name: 'section',
  group: 'block',
  content: 'block*',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      { tag: 'section' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['section', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

})
