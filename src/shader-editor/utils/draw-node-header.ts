import Canvas from "../lib/Canvas";
import NODE_TYPES from "../static/NODE_TYPES";
import IO_RADIUS from "../static/IO_RADIUS";
import type ShaderNode from "../lib/nodes/ShaderNode";
import type Comment from "../lib/nodes/Comment";

export default function drawNodeHeader(ctx: CanvasRenderingContext2D, node:ShaderNode|Comment, type?:number) {
    const name = node.name
    ctx.beginPath();

    let fontFill = "#f0f0f0"

    switch (type) {
        case NODE_TYPES.STATIC:
            ctx.fillStyle = "#555"
            break
        case NODE_TYPES.FUNCTION:
            ctx.fillStyle = "purple"
            break
        case NODE_TYPES.OUTPUT:
            ctx.fillStyle = "green"
            break
        case NODE_TYPES.VARIABLE:
            ctx.fillStyle = "red"
            break
        default:
            ctx.fillStyle = `rgb(${(node as Comment).color})`
    }
    ctx.strokeStyle = Canvas.borderColor
    ctx.lineWidth = .5
    ctx.roundRect(node.x, node.y, node.width, 23, [3, 3, 0, 0])
    ctx.stroke()
    ctx.fill()

    ctx.font = "bold 10px Arial";

    ctx.fillStyle = fontFill
    ctx.fillText(name, node.x + IO_RADIUS, node.y + 15);
    if((node as ShaderNode).uniform){
        const length = ctx.measureText(name + "T").width
        ctx.font = "6px Arial";
        ctx.fillStyle = "#999"
        ctx.fillText("(DYNAMIC)", node.x + length, node.y + 15);
    }
    ctx.closePath()

}