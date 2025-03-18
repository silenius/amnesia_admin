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

others: set[str] = { 
    'flex', 'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse',
    'flex-nowrap', 'flex-wrap', 'flex-wrap-reverse', 'justify-normal',
    'justify-start', 'justify-end', 'justify-center', 'justify-between',
    'justify-around', 'justify-evenly', 'justify-stretch', 'items-start',
    'items-end', 'items-center', 'items-baseline', 'items-stretch',
    'content-normal', 'content-start', 'content-end', 'content-center',
    'content-between', 'content-around', 'content-evenly', 'content-baseline',
    'content-stretch', 'basis-auto', 'basis-px', 'basis-0', 'basis-0.5',
    'basis-1', 'basis-1.5', 'basis-2', 'basis-2.5', 'basis-3', 'basis-3.5',
    'basis-4', 'basis-5', 'basis-6', 'basis-7', 'basis-8', 'basis-9',
    'basis-10', 'basis-11', 'basis-12', 'basis-14', 'basis-16', 'basis-20',
    'basis-24', 'basis-28', 'basis-32', 'basis-36', 'basis-40', 'basis-44',
    'basis-48', 'basis-52', 'basis-56', 'basis-60', 'basis-64', 'basis-72',
    'basis-80', 'basis-96', 'basis-1/2', 'basis-1/3', 'basis-2/3', 'basis-1/4',
    'basis-2/4', 'basis-3/4', 'basis-1/5', 'basis-2/5', 'basis-3/5',
    'basis-4/5', 'basis-1/6', 'basis-2/6', 'basis-3/6', 'basis-4/6',
    'basis-5/6', 'basis-1/12', 'basis-2/12', 'basis-3/12', 'basis-4/12',
    'basis-5/12', 'basis-6/12', 'basis-7/12', 'basis-8/12', 'basis-9/12',
    'basis-10/12', 'basis-11/12', 'basis-full', 'flex-1', 'flex-auto',
    'flex-initial', 'flex-none', 'grow', 'grow-0', 'shrink', 'shrink-0',
    'w-auto', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-2/4', 'w-3/4', 'w-1/5',
    'w-2/5', 'w-3/5', 'w-4/5', 'w-1/6', 'w-2/6', 'w-3/6', 'w-4/6', 'w-5/6',
    'w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-5/12', 'w-6/12', 'w-7/12',
    'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12', 'w-full', 'w-screen', 'w-svw',
    'w-lvw', 'w-dvw', 'w-min', 'w-max', 'w-fit', 'w-0', 'w-px', 'w-0.5', 'w-1',
    'w-1.5', 'w-2', 'w-2.5', 'w-3', 'w-3.5', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8',
    'w-9', 'w-10', 'w-11', 'w-12', 'w-14', 'w-16', 'w-20', 'w-24', 'w-28',
    'w-32', 'w-36', 'w-40', 'w-44', 'w-48', 'w-52', 'w-56', 'w-60', 'w-64',
    'w-72', 'w-80', 'w-96', 'h-auto', 'h-1/2', 'h-1/3', 'h-2/3', 'h-1/4',
    'h-2/4', 'h-3/4', 'h-1/5', 'h-2/5', 'h-3/5', 'h-4/5', 'h-1/6', 'h-2/6',
    'h-3/6', 'h-4/6', 'h-5/6', 'h-full', 'h-screen', 'h-svh', 'h-lvh', 'h-dvh',
    'h-min', 'h-max', 'h-fit', 'h-0', 'h-px', 'h-0.5', 'h-1', 'h-1.5', 'h-2',
    'h-2.5', 'h-3', 'h-3.5', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10',
    'h-11', 'h-12', 'h-14', 'h-16', 'h-20', 'h-24', 'h-28', 'h-32', 'h-36',
    'h-40', 'h-44', 'h-48', 'h-52', 'h-56', 'h-60', 'h-64', 'h-72', 'h-80',
    'h-96', 'font-thin', 'font-extralight', 'font-light', 'font-normal',
    'font-medium', 'font-semibold', 'font-bold', 'font-extrabold',
    'font-black', 'underline', 'overline', 'line-through', 'no-underline',
    'text-left', 'text-center', 'text-right', 'text-justify', 'text-start',
    'text-end', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl',
    'text-8xl', 'text-9xl', 'container', 'hidden', 'absolute', 'relative'
}

bps = {
    'hover', 'sm', 'md', 'lg', 'xl', '2xl'
}

def write_attr(f, attr):
    f.write(f'{attr} ')
    for bp in bps:
        f.write(f'{bp}:{attr} ')

with io.open('tailwind-safelist.txt', 'w') as f:
    for attr in it.chain(margins, paddings):
        for level in margins_paddings_levels:
            write_attr(f, f'{attr}-{level}')
    for color in it.chain(colors, colors_unique):
        for attr in {'border', 'fill', 'outline', 'ring', 'caret', 'bg', 'text'}:
            if color in colors_unique:
                write_attr(f, f'{attr}-{color}')
            else:
                for level in color_levels:
                    write_attr(f, f'{attr}-{color}-{level}')
    for item in others:
        write_attr(f, item)
    for i in range(1, 10):
        f.write(f'group/{i} group-hover/{i}:block ')
