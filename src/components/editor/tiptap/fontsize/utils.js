export const render_font_size_attrs = (attrs) => {
    if (Array.isArray(attrs.fontSize)) {
        return {
            class: `${attrs.fontSize.map((x) => [!x.breakpoint ? `text-${x.size}` : `${x.breakpoint}:text-${x.size}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
