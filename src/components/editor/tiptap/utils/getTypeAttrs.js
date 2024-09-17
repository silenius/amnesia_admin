export const getTypeAttrs = (props) => {
  const type = !props.type ? props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  ) : props.type

  if (type) {
    return props.editor.getAttributes(type)
  }
}
