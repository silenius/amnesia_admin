export const render_gapX_attrs = (attrs) => {
    if (Array.isArray(attrs.gapX)) {
        console.log('LOLLLL : ', attrs.gapX)
        return {
            class: `${attrs.gapX.map((x) => [!x.breakpoint ? `gap-x-${x.gap}` : `${x.breakpoint}:gap-x-${x.gap}`].filter(Boolean).join('-')).join(' ')}`
        }
    }
}

export const render_gapY_attrs = (attrs) => {
    if (Array.isArray(attrs.gapY)) {
        return {
            class: `${attrs.gapY.map((x) => [!x.breakpoint ? `gap-y-${x.gap}` : `${x.breakpoint}:gap-y-${x.gap}`].filter(Boolean).join('-')).join(' ')}`
        }
    }

}
