export const render_basis_attrs = (attrs) => {
    if (Array.isArray(attrs.basis)) {
        return {
            class: `${attrs.basis.map((x) => [!x.breakpoint ? `basis-${x.basis}` : `${x.breakpoint}:basis-${x.basis}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

export const render_flex_attrs = (attrs) => {
    if (Array.isArray(attrs.flex)) {
        return {
            class: `${attrs.flex.map((x) => [!x.breakpoint ? `flex-${x.flex}` : `${x.breakpoint}:flex-${x.flex}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

