export const render_maxWidth_attrs = (attrs) => {
    if (Array.isArray(attrs.maxWidth)) {
        return {
            class: `${attrs.maxWidth.map((x) => [!x.breakpoint ? `max-w-${x.maxWidth}` : `${x.breakpoint}:max-w-${x.maxWidth}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
