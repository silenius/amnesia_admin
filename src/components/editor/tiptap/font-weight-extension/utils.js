export const render_font_weight_attrs = (attrs) => {
    if (Array.isArray(attrs.fontWeight)) {
        return {
            class: `${attrs.fontWeight.map((x) => [!x.breakpoint ? `font-${x.weight}` : `${x.breakpoint}:font-${x.weight}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
