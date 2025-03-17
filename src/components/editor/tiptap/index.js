import { 
    useEditor, 
    EditorContent,
    BubbleMenu
} from '@tiptap/vue-3'

import { fontFamily } from '../../../fonts'

import { backend_url } from '../../../composables/fetch.js';

import Typography from '@tiptap/extension-typography'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'
//import Youtube from '@tiptap/extension-youtube'
import Image from './image/image'
import Video from './video-extension/video'
import FontSize from './fontsize'
import TextClass from './text-class'
import { Float } from './float-extension'
import { Align } from './align-extension'
import TextColor from './text-color'
import BackgroundColor from './background-color'
import Padding from './padding'
import Margin from './margin'
import FontWeight from './font-weight-extension'
import FontFamily from './font-family-extension'
import FontItalic from './font-italic-extension'
import TextDecoration from './text-decoration-extension'
import Width from './width-extension'
import MinWidth from './min-width-extension'
import MaxWidth from './max-width-extension'
import Height from './height-extension'
import MinHeight from './min-height-extension'
import MaxHeight from './max-height-extension'
import Container from './container-extension'
import Clear from './clear-extension'
import TipTapCommands from './utils/updateAttributes'
import FlexContainer from './flex-container-extension'
import FlexItem from './flex-item-extension'
import Gap from './gap-extension'
import Article from './article-extension'
import Div from './div-extension'
import Section from './section-extension'
import BorderWidth from './border-width-extension'
import BorderColor from './border-color-extension'
import BorderRadius from './border-radius-extension'

const fonts = Object.keys(fontFamily).concat(['sans', 'serif', 'mono'])
export const default_extensions = [
    Document,
    Paragraph,
    Text,
    History,
    Typography,
    /*
    Youtube,
    TextAlign.configure({
      types: ['image', 'paragraph'],
    })
    ,*/
    //ResizableMedia
    Image.configure({
        inline: false,
        allowBase64: true,
        onSrc: (src) => {
            const match = src.match(/^(?<id>\d+)\/download(\/inline)?$/)
            return match ? backend_url(match.groups.id) : src
        }
    }),
    Video,
    Float.configure({
        types: ['video', 'image', 'paragraph', 'textClass'],
    }),
    Clear.configure({
        types: ['video', 'image', 'paragraph', 'textClass'],
    }),
    Align.configure({
        types: ['video', 'image', 'paragraph'],
    }),
    TextStyle,
    TextClass,
    Container.configure({
        types: ['paragraph']
    }),
    FontSize.configure({
        types: ['textClass', 'paragraph']
    }),
    TextColor.configure({
        types: ['textClass', 'textStyle', 'paragraph']
    }),
    BackgroundColor.configure({
        types: ['flexContainer', 'flexItem', 'paragraph', 'textClass', 'image', 'video']
    }),
    Margin.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'bulletList', 'paragraph', 'textClass', 'textStyle']
    }),
    Padding.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'bulletList', 'textClass', 'paragraph', 'textStyle']
    }),
    FontWeight.configure({
        types: ['textClass', 'paragraph'] 
    }),
    FontFamily.configure({
        types: ['textClass', 'paragraph'],
        families: fonts
    }),
    FontItalic.configure({
        types: ['textClass', 'paragraph']
    }),
    TextDecoration.configure({
        types: ['textClass', 'paragraph']
    }),
    Width.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    MinWidth.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    MinHeight.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    MaxWidth.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    MaxHeight.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    Height.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    BorderWidth.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    BorderColor.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    BorderRadius.configure({
        types: ['flexContainer', 'flexItem', 'video', 'image', 'paragraph', 'heading']
    }),
    Table,
    TableHeader,
    TableRow,
    TableCell,
    Link.configure({
        spanning: false
    }),
    FlexContainer,
    FlexItem,
    Gap,
    Article,
    Div,
    Section,
]

export const build_editor = (options) => {
    return useEditor({
        ...options,
    })
}
