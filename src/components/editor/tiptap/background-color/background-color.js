import {
    Extension
} from '@tiptap/core'

import {
    unshaded_colors,
    shaded_colors,
    shades
} from '../colors'

export const BackgroundColor = Extension.create({
    name: 'backgroundColor',

    addOptions() {
        return {
            types: [],
            unshaded_colors: unshaded_colors,
            shaded_colors: shaded_colors,
            shades: shades,
            class_re: /^bg-(?<color>[a-z]+)(?:-(?<shade>\d{2,3}))?$/
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    backgroundColor: {
                        default: null,

                        parseHTML: (elem) => { 
                            if (elem.style.backgroundColor) {
                                return elem.style.backgroundColor
                            } 

                            for (const name of elem.classList) {
                                const match = name.match(this.options.class_re)

                                if (match !== null) {
                                    // Do we have bg-xxx or bg-xxx-yyy ?
                                    return (
                                        match.groups.shade !== undefined
                                        && this.options.shaded_colors.indexOf(
                                            match.groups.color) !== -1
                                        && this.options.shades.indexOf(
                                            parseInt(match.groups.shade)) !== -1
                                    ) ? {
                                        color: match.groups.color,
                                        shade: match.groups.shade
                                    } : (
                                        this.options.unshaded_colors.indexOf(
                                            match.groups.color
                                        ) !== -1
                                    ) ? {
                                        color: match.groups.color
                                    } : false
                                }
                            }

                            return false
                        },

                        renderHTML: (attrs) => {
                            if (attrs.backgroundColor?.color) {

                                if (attrs.backgroundColor.shade) {
                                    return { 
                                        class: `bg-${attrs.backgroundColor.color}-${attrs.backgroundColor.shade}` 
                                    }
                                }

                                return { 
                                    class: `bg-${attrs.backgroundColor.color}`
                                }
                            }

                            return { style: `backgroundColor: ${attrs.backgroundColor}` }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setBackgroundColor: (color, shade) => ({ chain, tr }) => {
                return ( 
                    tr.selection.node?.type.isText === false
                    || (
                        shade !== undefined
                        && (this.options.shaded_colors.indexOf(color) === -1
                        || this.options.shades.indexOf(parseInt(shade)) === -1)
                    )
                    || (
                        shade === undefined
                        && this.options.unshaded_colors.indexOf(color) === -1
                    )
                ) ? false : chain().setMark(
                    'textClass', { 
                        backgroundColor: { 
                            color: color, 
                            shade: shade 
                        }
                    }
                ).run() 
            },
        }
    },


})
