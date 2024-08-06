export const render_container_attrs = (attrs) => {
    if (Array.isArray(attrs.container)) {
        return {
            class: `${attrs.container.map((x) => [!x.breakpoint ? x.container : `${x.breakpoint}:${x.container}`].filter(Boolean).join('-')).join(' ')}`,
        }
    } 
}
