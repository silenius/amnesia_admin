import {
    generate_responsive_cls,
    responsive_breakpoints
} from '.'

export const extract_tw_attrs = (elem, values, prefix) => {
    const is_attr = new Set(
        values.map(
            (x) => Array.from(
                generate_responsive_cls(prefix ? `${prefix}${x}` : x)
            )
        ).flat()
    )

    const matches = []

    for (const name of elem.classList) {
        if (is_attr.has(name)) {
            const colon_split = name.split(':')
            const breakpoint = colon_split.find(
                (x) => responsive_breakpoints.has(x)
            ) || null
           const value = colon_split.pop()

            matches.push({
                breakpoint: breakpoint,
                tw: value
            })
        }
    }

    return matches.length ? matches : null
}


export const render_tw_attrs = (attrs, attr) => {
    if (Array.isArray(attrs[attr])) {
        return {
            class: attrs[attr].map(
                (x) => [!x.breakpoint ? x.tw : `${x.breakpoint}:${x.tw}`]
            ).join(' ')
        }
    }
}
