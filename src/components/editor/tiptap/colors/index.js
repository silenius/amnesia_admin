export const unshaded_colors = new Set([
    'white', 'black', 'transparent', 'current', 'inherit'
])

export const shaded_colors = new Set([
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
    'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 
    'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
])

export const shades = new Set([
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
])

export const build_palette = (c=shaded_colors, s=shades) => c.values().toArray().map(
    (color) => s.values().toArray().map(
        (shade) => `${color}-${shade}`
    )
).flat()
