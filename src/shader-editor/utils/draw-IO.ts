import Canvas from "../lib/canvas/Canvas";
import NODE_TYPES from "../static/NODE_TYPES";
import DATA_TYPES from "../static/DATA_TYPES";
import drawRoundedRect from "./draw-rounded-rect";

export default function drawIO(ctx: CanvasRenderingContext2D, asOutput, node, index, attribute) {
    ctx.font = "bold 8px Arial";
    const enabled = !attribute.disabled
    const label = attribute.label
    const type = attribute.type
    const x = node.x, y = node.y, w = node.width
    const LABEL_OFFSET = 13
    const H_OFFSET = 20
    const H = 20
    const Y = y + H * (index + 1) + H_OFFSET
    const X = !asOutput ? x + 2.5 : x + w - 15
    const R = 4
    const YA = Y - R
    const labelSize = ctx.measureText(label).width + LABEL_OFFSET
    const T_SIZE = ctx.measureText("T").width

    switch (asOutput ? type : undefined) {
        case DATA_TYPES.VEC2:
            ctx.fillStyle = "cyan"
            break
        case DATA_TYPES.VEC3:
            ctx.fillStyle = "blue"
            break
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
        default:
            ctx.fillStyle = Canvas.backgroundColor
    }
    ctx.strokeStyle = Canvas.borderColor
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(X + LABEL_OFFSET / 2, YA, R, 0, Math.PI * 2)
    ctx.fill()
    if (enabled)
        ctx.stroke()


    if (asOutput && type) {
        const UT = type.toUpperCase()
        const containerHeight = 10
        ctx.font = "5px Arial";
        const T_SIZE = ctx.measureText("T").width
        const typeW = ctx.measureText(UT).width + T_SIZE
        const typeX = X - labelSize + LABEL_OFFSET - typeW, typeY = Y - H / 2
        ctx.fillStyle =  "#afafaf"

        ctx.fillText(UT, typeX - T_SIZE / 2, typeY + Canvas.fontSize - containerHeight / 5);
    }

    ctx.font = "bold 8px Arial";
    ctx.fillStyle = enabled ? "#d7d7d7" : "#afafaf"
    if (asOutput)
        ctx.fillText(label, X - labelSize + LABEL_OFFSET, Y - T_SIZE / 2);
    else
        ctx.fillText(label, X + LABEL_OFFSET, Y - T_SIZE / 2);

    ctx.closePath()
}