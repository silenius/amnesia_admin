import {
    Extension
} from '@tiptap/core'

import {
    unshaded_colors,
    shaded_colors,
    shades
} from '../colors'

export const TextColor = Extension.create({
    name: 'textColor',

    addOptions() {
        return {
            types: [],
            unshaded_colors: unshaded_colors,
            shaded_colors: shaded_colors,
            shades: shades,
            class_re: /^(md:)?text-(?<color>[a-z]+)(?:-(?<shade>\d{2,3}))?$/
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textColor: {
                        default: null,

                        parseHTML: (elem) => { 
                            if (elem.style.color) {
                                return elem.style.color
                            } 

                            for (const name of elem.classList) {
                                const match = name.match(this.options.class_re)

                                if (match !== null) {
                                    // Do we have text-xxx or text-xxx-yyy ?
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
                                    } : null
                                }
                            }
                        },

                        renderHTML: (attrs) => {
                            console.log(attrs)
                            if (attrs.textColor?.color) {

                                if (attrs.textColor.shade) {
                                    return { 
                                        class: `text-${attrs.textColor.color}-${attrs.textColor.shade}` 
                                    }
                                }

                                return { 
                                    class: `text-${attrs.textColor.color}`
                                }
                            } else if (attrs.textColor) {
                                return { style: `color: ${attrs.textColor}` }
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setTextColor: (color, shade) => ({ chain, tr }) => {
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
                ) ? null : chain().setMark(
                    'textClass', { 
                        textColor: { 
                            color: color, 
                            shade: shade 
                        }
                    }
                ).run() 
            },
        }
    },


})
