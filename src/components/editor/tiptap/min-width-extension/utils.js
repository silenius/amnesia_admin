export const render_minWidth_attrs = (attrs) => {
    if (Array.isArray(attrs.minWidth)) {
        return {
            class: `${attrs.minWidth.map((x) => [!x.breakpoint ? `min-w-${x.minWidth}` : `${x.breakpoint}:min-w-${x.minWidth}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
