export const patterns = [
    {
        regex: /youtu\.be\/(?<VIDEOID>[\w\-]+)/i,
        type: 'youtube',
    },
    {
        regex: /youtube\.com(?:.+)v=(?<VIDEOID>[^&]+)/i,
        type: 'youtube',
    },
    {
        regex: /youtube.com\/embed\/(?<VIDEOID>[\w\-]+)/i,
        type: 'youtube',
    },
    {
        regex: /vimeo\.com\/(?<VIDEOID>\d+)/,
        type: 'vimeo',
    },
    {
        regex: /dailymotion\.com\/video\/(?<VIDEOID>[^_]+)/,
        type: 'dailymotion',
    },
    {
        regex: /dai\.ly\/(?<VIDEOID>[^_]+)/,
        type: 'dailymotion',
    }
];

// Ratio = 1.77777777777777
export const sizes = {
    youtube: [560, 315],
    vimeo: [640, 360],
    dailymotion: ['100%', '100%']
}

export const guess_video = (url) => {
    const pattern = patterns.find((p) => p.regex.exec(url))
    
    if (pattern) {
        return {
            type: pattern.type,
            attrs: pattern.regex.exec(url).groups
        }
    }

    return { type: null, attrs: {}}
}
