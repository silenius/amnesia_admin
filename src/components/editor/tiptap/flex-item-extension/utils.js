export const render_basis_attrs = (attrs) => {
    if (Array.isArray(attrs.basis)) {
        return {
            class: `${attrs.basis.map((x) => [!x.breakpoint ? `basis-${x.basis}` : `${x.breakpoint}:basis-${x.basis}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

