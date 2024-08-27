export const render_direction_attrs = (attrs) => {
    if (Array.isArray(attrs.direction)) {
        return {
            class: `${attrs.direction.map((x) => [!x.breakpoint ? `flex-${x.direction}` : `${x.breakpoint}:flex-${x.direction}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

export const render_wrap_attrs = (attrs) => {
    if (Array.isArray(attrs.wrap)) {
        return {
            class: `${attrs.wrap.map((x) => [!x.breakpoint ? `flex-${x.wrap}` : `${x.breakpoint}:flex-${x.wrap}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

export const render_justify_attrs = (attrs) => {
    if (Array.isArray(attrs.justify_content)) {
        return {
            class: `${attrs.justify_content.map((x) => [!x.breakpoint ? `justify-${x.justify_content}` : `${x.breakpoint}:justify-${x.justify_content}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

export const render_align_items_attrs = (attrs) => {
    if (Array.isArray(attrs.align_items)) {
        return {
            class: `${attrs.align_items.map((x) => [!x.breakpoint ? `items-${x.align_items}` : `${x.breakpoint}:items-${x.align_items}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

