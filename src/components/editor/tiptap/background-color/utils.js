export const render_bg_color_attrs = (attrs) => {
    if (Array.isArray(attrs.backgroundColor)) {
        return {
            class: `${attrs.backgroundColor.map((x) => [!x.breakpoint ? 'bg' : `${x.breakpoint}:bg`, x.color, x.shade].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
