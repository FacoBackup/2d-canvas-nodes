import Canvas from "../lib/canvas/Canvas";
import type ShaderLink from "../lib/nodes/ShaderLink";

export default function drawBezierCurve(ctx:CanvasRenderingContext2D, x1,x2,y1,y2){
    const pivot = x1 < x2 ? 1 + (x2 - 1)/2 : x2 + (x1 - x2)/2

    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(pivot, y1, pivot, y2, x2, y2);
    ctx.stroke();
}