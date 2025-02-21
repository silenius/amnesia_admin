import itertools as it
import io

margins: set[str] = {
    'mx', 'my', 'mt', 'mb', 'mr', 'ml'
}

paddings: set[str] = {
    'px', 'py', 'pt', 'pb', 'pr', 'pl'
}

color_levels: set[int] = {
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
}

colors: set[str] = {
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange',
    'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
}

colors_unique: set[str] = {
    'white', 'black', 'transparent', 'current', 'inherit' 
}

margins_paddings_levels: set[str] = {
    'auto', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36',
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'
}

with io.open('tailwind-safelist.txt', 'w') as f:
    for attr in it.chain(margins, paddings):
        for level in margins_paddings_levels:
            f.write(f'{attr}-{level} ')
    for color in it.chain(colors, colors_unique):
        for attr in {'border', 'fill', 'outline', 'ring', 'caret', 'bg', 'text'}:
            if color in colors_unique:
                f.write(f'{attr}-{color} ')
            else:
                for level in color_levels:
                    f.write(f'{attr}-{color}-{level} ')

