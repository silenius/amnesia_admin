export const render_height_attrs = (attrs) => {
    if (Array.isArray(attrs.height)) {
        return {
            class: `${attrs.height.map((x) => [!x.breakpoint ? `h-${x.height}` : `${x.breakpoint}:h-${x.height}`].filter(Boolean).join('-')).join(' ')}`
        }
    } else {
        return {
            height: attrs.height
        }
    }
}
