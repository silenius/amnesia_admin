export const render_align_attrs = (attrs) => {
    if (Array.isArray(attrs.align)) {
        return {
            class: `${attrs.align.map((x) => [!x.breakpoint ? `text-${x.direction}` : `${x.breakpoint}:text-${x.direction}`, x.level].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
