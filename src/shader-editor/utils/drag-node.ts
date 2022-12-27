import Canvas from "../lib/canvas/Canvas";


export function listenTo(event, nodeBbox, parent) {
    const parentBBox = parent.getBoundingClientRect(),
        bounding = {
            x: parent.scrollLeft - parentBBox.left + nodeBbox.x - event.clientX,
            y: parent.scrollTop - parentBBox.top + nodeBbox.y - event.clientY
        },
        current = {
            x: Math.round(((event.clientX + bounding.x) / Canvas.scale) / Canvas.grid) * Canvas.grid,
            y: Math.round(((event.clientY + bounding.y) / Canvas.scale) / Canvas.grid) * Canvas.grid
        }
    return {
        current,
        onMouseUp: () => {
            if (current.x === undefined)
                return
            if ((nodeBbox.top - parentBBox.top) < 0)
                current.y = 0
            if ((nodeBbox.left - parentBBox.left) < 0)
                current.x = 0
            if ((nodeBbox.top - parentBBox.top) > parentBBox.height)
                current.y = parentBBox.height - nodeBbox.height
            if ((nodeBbox.left - parentBBox.left) > parentBBox.width)
                current.x = parentBBox.width - nodeBbox.width
            nodeBbox.x = current.x
            nodeBbox.y = current.y
        },
        onMouseMove: ev => {
            console.log("IM HERE")
            current.x = Math.round(((ev.clientX + bounding.x) / Canvas.scale) / Canvas.grid) * Canvas.grid
            current.y = Math.round(((ev.clientY + bounding.y) / Canvas.scale) / Canvas.grid) * Canvas.grid

            nodeBbox.x = current.x
            nodeBbox.y = current.y
        }
    }
}