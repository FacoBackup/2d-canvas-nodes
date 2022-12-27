import Canvas from "../lib/canvas/Canvas";

export default function BezierCurve(ctx, x1, x2, y1, y2){
    const pivot = x1 < x2 ? 1 + (x2 - 1)/2 : x2 + (x1 - x2)/2
    ctx.fillStyle = Canvas.borderColor
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(pivot, y1, pivot, y2, x2, y2);
    ctx.stroke();
}