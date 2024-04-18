export const render_font_italic_attrs = (attrs) => {
    if (Array.isArray(attrs.fontItalic)) {
        return {
            class: `${attrs.fontItalic.map((x) => [!x.breakpoint ? x.italic : `${x.breakpoint}:${x.italic}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
