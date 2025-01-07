export const getTypeAttrs = (props, attr) => {
  const type = !props.type ? props.extension.options.types.find(
    (x) => props.editor.isActive(x)
  ) : props.type

  return props.editor.getAttributes(type)[attr].find(
    (x) => x.breakpoint == props.breakpoint
  ).tw
}
