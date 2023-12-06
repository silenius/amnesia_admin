import { Image as TipTapImage } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import Image from './Image.vue';

export default TipTapImage.extend({
	addAttributes() {
		return {
			...this.parent?.(),

			width: {
				default: '100%',
			},

			height: {
				default: 'auto',
			},
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
    return () => {
      const container = document.createElement('div')

      container.addEventListener('click', event => {
        alert('clicked on the container')
      })

      const content = document.createElement('div')
      container.append(content)

      return {
        dom: container,
        contentDOM: content,
      }
    }
  },
    

    /*
	addNodeView() {
		return VueNodeViewRenderer(Image);
	}
    */
});
