import {
    getMarkAttributes,
    Mark,
    mergeAttributes,
} from '@tiptap/core'

export const TextClass = Mark.create({
    name: 'textClass',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span',
                getAttrs: element => element.hasAttribute('class') ? {} : false,
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        console.log('TEXT CLASS: ', HTMLAttributes)
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            removeEmptyTextClass: () => ({ state, commands }) => {
                const attributes = getMarkAttributes(state, this.type)
                const hasClasses = Object.entries(attributes).some(([, value]) => !!value)

                return hasClasses ? true : commands.unsetMark(this.name)
            },
        }
    },

})
