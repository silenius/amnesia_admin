export const render_maxHeight_attrs = (attrs) => {
    if (Array.isArray(attrs.maxHeight)) {
        return {
            class: `${attrs.maxHeight.map((x) => [!x.breakpoint ? `max-h-${x.maxHeight}` : `${x.breakpoint}:max-h-${x.maxHeight}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
