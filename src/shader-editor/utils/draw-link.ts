import Canvas from "../lib/Canvas";
import type ShaderLink from "../lib/nodes/ShaderLink";
import drawBezierCurve from "./draw-bezier-curve";
import DATA_TYPES from "../static/DATA_TYPES";
import HEADER_HEIGHT from "../static/HEADER_HEIGHT";
import IO_RADIUS from "../static/IO_RADIUS";
import ShaderNode from "../lib/nodes/ShaderNode";

export default function drawLink(ctx: CanvasRenderingContext2D, link: ShaderLink) {
    const T = link.targetNode, S = link.sourceNode
    const x1 = S.x + S.width, x2 = T.x,
        y1 = S.y +HEADER_HEIGHT + IO_RADIUS *3 + S.output.indexOf(link.sourceRef)* 20,
        y2 = T.y + HEADER_HEIGHT + IO_RADIUS *3 + T.inputs.indexOf(link.targetRef) * 20

    ctx.strokeStyle = ShaderNode.getIOColor(link.sourceRef)

    drawBezierCurve(ctx, x1, x2, y1, y2)
}