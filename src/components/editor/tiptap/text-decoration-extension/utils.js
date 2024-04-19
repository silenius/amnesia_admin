export const render_text_decoration_attrs = (attrs) => {
    if (Array.isArray(attrs.textDecoration)) {
        return {
            class: `${attrs.textDecoration.map((x) => [!x.breakpoint ? x.decoration : `${x.breakpoint}:${x.decoration}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
