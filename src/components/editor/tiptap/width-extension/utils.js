export const render_width_attrs = (attrs) => {
    if (Array.isArray(attrs.width)) {
        return {
            class: `${attrs.width.map((x) => [!x.breakpoint ? `w-${x.width}` : `${x.breakpoint}:w-${x.width}`].filter(Boolean).join('-')).join(' ')}`
        }
    } else {
        return {
            width: attrs.width
        }
    }
}
