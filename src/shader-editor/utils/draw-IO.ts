import Canvas from "../lib/canvas/Canvas";
import NODE_TYPES from "../static/NODE_TYPES";
import DATA_TYPES from "../static/DATA_TYPES";
import drawRoundedRect from "./draw-rounded-rect";
import IO_RADIUS from "../static/IO_RADIUS";
import HEADER_HEIGHT from "../static/HEADER_HEIGHT";

export default function drawIO(ctx: CanvasRenderingContext2D, asOutput, node, index, attribute) {
    ctx.font = asOutput ? "bold 8px Arial" : "8px Arial";
    const enabled = !attribute.disabled
    const label = attribute.label
    const type = attribute.type
    const x = node.x, y = node.y, w = node.width
    const LABEL_OFFSET = 13

    const H = HEADER_HEIGHT - 5
    const Y = y + H * (index + 2)
    let X = !asOutput ? x : x + w

    const YA = Y - IO_RADIUS
    const labelSize = ctx.measureText(label).width + LABEL_OFFSET
    const T_SIZE = ctx.measureText("T").width

    switch (type) {
        case DATA_TYPES.VEC2:
        case DATA_TYPES.VEC3:
        case DATA_TYPES.VEC4:
            ctx.fillStyle = "purple"
            break
        case DATA_TYPES.FLOAT:
            ctx.fillStyle = "green"
            break
        case DATA_TYPES.TEXTURE:
            ctx.fillStyle = "darkorange"
            break
        case DATA_TYPES.ANY:
            ctx.fillStyle = "white"
            break
    }
    ctx.strokeStyle = Canvas.borderColor
    ctx.beginPath()
    ctx.lineWidth = .5
    ctx.arc(X, YA, IO_RADIUS, 0, Math.PI * 2)
    ctx.fill()
    if(asOutput){
        X -= T_SIZE*2
    }else
        X -= T_SIZE
    if (enabled)
        ctx.stroke()

    ctx.fillStyle = enabled ? "#d7d7d7" : "#afafaf"
    if (asOutput)
        ctx.fillText(label, X - labelSize + LABEL_OFFSET, Y - T_SIZE / 2);
    else
        ctx.fillText(label, X + LABEL_OFFSET, Y - T_SIZE / 2);

    ctx.closePath()
}