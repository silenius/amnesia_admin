export const render_float_attrs = (attrs) => {
    if (Array.isArray(attrs.float)) {
        return {
            class: `${attrs.float.map((x) => [!x.breakpoint ? `float-${x.float}` : `${x.breakpoint}:float-${x.float}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
