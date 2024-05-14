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

    renderHTML(p) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, p.HTMLAttributes), 0]
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
