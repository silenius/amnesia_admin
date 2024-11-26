export const getSelectedAttrs = (props, attr) => {
    return props.selected.node.attrs[attr].find(
        (x) => x.breakpoint == props.breakpoint
    ).tw
}
