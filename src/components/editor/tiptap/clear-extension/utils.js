export const render_clear_attrs = (attrs) => {
    if (Array.isArray(attrs.clear)) {
        return {
            class: `${attrs.clear.map((x) => [!x.breakpoint ? `clear-${x.clear}` : `${x.breakpoint}:clear-${x.clear}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
