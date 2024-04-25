export const render_float_attrs = (attrs) => {
    if (Array.isArray(attrs.float)) {
        return {
            class: `${attrs.float.map((x) => [!x.breakpoint ? `float-${x.direction}` : `${x.breakpoint}:float-${x.direction}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
