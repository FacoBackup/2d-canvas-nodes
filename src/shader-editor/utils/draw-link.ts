import Canvas from "../lib/canvas/Canvas";
import type ShaderLink from "../lib/nodes/ShaderLink";
import drawBezierCurve from "./draw-bezier-curve";
import DATA_TYPES from "../static/DATA_TYPES";
import HEADER_HEIGHT from "../static/HEADER_HEIGHT";
import IO_RADIUS from "../static/IO_RADIUS";

export default function drawLink(ctx: CanvasRenderingContext2D, link: ShaderLink) {
    const T = link.targetNode, S = link.sourceNode
    const x1 = S.x + S.width, x2 = T.x,
        y1 = S.y +HEADER_HEIGHT + IO_RADIUS *3 + S.output.indexOf(link.sourceRef)* 20,
        y2 = T.y + HEADER_HEIGHT + IO_RADIUS *3 + T.inputs.indexOf(link.targetRef) * 20

    switch (link.sourceRef.type) {
        case DATA_TYPES.VEC2:
        case DATA_TYPES.VEC3:
        case DATA_TYPES.VEC4:
            ctx.strokeStyle = "purple"
            break
        case DATA_TYPES.FLOAT:
            ctx.strokeStyle = "green"
            break
        case DATA_TYPES.TEXTURE:
            ctx.strokeStyle = "darkorange"
            break
        case DATA_TYPES.ANY:
            ctx.strokeStyle = "white"
            break
        default:
            ctx.strokeStyle = Canvas.borderColor
    }

    drawBezierCurve(ctx, x1, x2, y1, y2)
}