export const render_minHeight_attrs = (attrs) => {
    if (Array.isArray(attrs.minHeight)) {
        return {
            class: `${attrs.minHeight.map((x) => [!x.breakpoint ? `min-h-${x.minHeight}` : `${x.breakpoint}:min-h-${x.minHeight}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
