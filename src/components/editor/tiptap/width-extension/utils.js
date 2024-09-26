export const render_width_attrs = (attrs) => {
    if (Array.isArray(attrs.width)) {
        return {
            class: `${attrs.width.map((x) => [!x.breakpoint ? `${x.value}` : `${x.breakpoint}:${x.value}`].filter(Boolean).join('-')).join(' ')}`,
        }
    } 
}
