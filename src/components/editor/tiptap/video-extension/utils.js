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

export const guess_video = (url) => {
    const pattern = patterns.find((p) => p.regex.exec(url))
    
    if (pattern) {
        return {
            type: pattern.type,
            attrs: pattern.regex.exec(url).groups
        }
    }
}
