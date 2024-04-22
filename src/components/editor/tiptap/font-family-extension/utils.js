export const render_font_family_attrs = (attrs) => {
    if (Array.isArray(attrs.fontFamily)) {
        return {
            class: `${attrs.fontFamily.map((x) => [!x.breakpoint ? `font-${x.family}` : `${x.breakpoint}:font-${x.family}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}
