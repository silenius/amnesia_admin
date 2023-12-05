import { Image as TipTapImage } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import Image from './Image.vue';

export default TipTapImage.extend({
	addAttributes() {
		return {
			...this.parent?.(),

			width: {
				default: '100%',
				renderHTML: (attributes) => {
					return {
						width: attributes.width
					};
				}
			},

			height: {
				default: 'auto',
				renderHTML: (attributes) => {
					return {
						height: attributes.height
					};
				}
			},

			isDraggable: {
				default: true,
				renderHTML: (attributes) => {
					return {};
				}
			}
		};
	},

	addCommands() {
		return {
			...this.parent?.(),

			toggleResizable:
				() =>
				({ tr }) => {
					const { node } = tr?.selection;

					if (node?.type?.name === 'ResizableImage') {
						node.attrs.isDraggable = !node.attrs.isDraggable;
					}
				}
		};
	},

	addNodeView() {
		return VueNodeViewRenderer(Image);
	}
});
