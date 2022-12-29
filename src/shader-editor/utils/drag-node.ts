import Canvas from "../lib/Canvas";
import type MutableObject from "../static/MutableObject";
import type ShaderNode from "../lib/nodes/ShaderNode";


export default function dragNode(event:MouseEvent, nodeBbox:ShaderNode, parent:HTMLElement, parentBBox:MutableObject):{onMouseUp:Function, onMouseMove:Function} {
    const bounding = {
            x: parent.scrollLeft - parentBBox.left + nodeBbox.x * Canvas.scale - event.clientX,
            y: parent.scrollTop - parentBBox.top + nodeBbox.y* Canvas.scale - event.clientY
        }

    return {
        onMouseUp: () => {

            if ((nodeBbox.top - parentBBox.top) < 0)
                nodeBbox.y = 0
            if ((nodeBbox.left - parentBBox.left) < 0)
                nodeBbox.x = 0
            if ((nodeBbox.top - parentBBox.top) > parentBBox.height)
                nodeBbox.y = parentBBox.height - nodeBbox.height
            if ((nodeBbox.left - parentBBox.left) > parentBBox.width)
                nodeBbox.x = parentBBox.width - nodeBbox.width

        },
        onMouseMove: ev => {
            nodeBbox.x = Math.round(((ev.clientX + bounding.x) / Canvas.scale) / Canvas.grid) * Canvas.grid
            nodeBbox.y = Math.round(((ev.clientY + bounding.y) / Canvas.scale) / Canvas.grid) * Canvas.grid

        }
    }
}