export const responsive_breakpoints = new Set([
    'sm', 'md', 'lg', 'xl', '2xl'
])

export const generate_responsive_cls = (cls) => new Set([
    `${cls}`,
    `sm:${cls}`,
    `md:${cls}`,
    `lg:${cls}`,
    `xl:${cls}`,
    `2xl:${cls}`,
])

export const get_modifiers = (cls) => {
    const modifiers = cls.split(':')
    modifiers.pop()

    return modifiers
}

export * from './getTypeAttrs.js'
export * from './attrs.js'
export * from './updateAttributes.js'
