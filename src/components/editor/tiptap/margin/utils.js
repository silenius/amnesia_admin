export const render_margin_attrs = (attrs, side) => {
    if (Array.isArray(attrs[side])) {
        return {
            class: `${attrs[side].map((x) => [!x.breakpoint ? side : `${x.breakpoint}:${side}`, x.level].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
