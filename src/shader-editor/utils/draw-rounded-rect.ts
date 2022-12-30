import Canvas from "../lib/Canvas";
import type ShaderNode from "../lib/nodes/ShaderNode";
import type Comment from "../lib/nodes/Comment";

export default function drawRoundedRect(ctx: CanvasRenderingContext2D, node:ShaderNode|Comment, r: number, isSelected:boolean, isFirstSelected:boolean, color:string) {
    const w = node.width, h = node.height, x = node.x, y = node.y
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    let outlineColor = Canvas.borderColor
    if(isSelected)
        outlineColor = isFirstSelected ? "white" : "darkorange"

    ctx.fillStyle = color
    ctx.lineWidth = isSelected ? 2: 1
    ctx.strokeStyle = outlineColor

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r)
    ctx.stroke()
    ctx.fill()
}