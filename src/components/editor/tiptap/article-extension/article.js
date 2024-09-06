import { 
    Node,
    mergeAttributes
} from '@tiptap/core'

export const Article = Node.create({
  name: 'article',
  group: 'block',
  content: 'block*',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      { tag: 'article' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['article', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

})
