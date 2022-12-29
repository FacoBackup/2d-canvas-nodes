export default function drawBezierCurve(ctx:CanvasRenderingContext2D, x1,x2,y1,y2){
    const diff = Math.abs((x1 - x2)/2)
    const pivot = Math.min(x1, x2) + diff

    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(pivot, y1, pivot, y2, x2, y2);
    ctx.stroke();
}