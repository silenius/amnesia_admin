import {
    Extension
} from '@titap/core'

export const TextColor = Extension.create({
    name: 'textColor',

    addOptions() {
        return {
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    color: {
                        default: null,

                        parseHTML: (elem) => { 
                            if (elem.style.color) {
                                return elem.style.color
                            } else {
                                for (const [size, props] of Object.entries(this.options.sizes)) {
                                    if (elem.classList.contains(props.class)) {
                                        return size
                                    }
                                }
                            }
                        },

                        renderHTML: (attrs) => {
                            if (attrs.fontSize) {
                                const v = this.options.sizes[attrs.fontSize]

                                if (v) {
                                    return { class: v.class }
                                }

                                return { style: `font-size: ${attrs.fontSize}` }
                            }
                        }
                    }
                }
            }
        ]
    },


})
