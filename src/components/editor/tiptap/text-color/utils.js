export const build_color_class = (names, variants, prefix) => names.reduce(
    (accumulator, item) => new Set([
        ...accumulator, 
        ...variants.map(
            variant => prefix !== undefined ? `${prefix}-${item}-${variant}` : `${item}-${variant}`
        )
    ]), new Set()
)
