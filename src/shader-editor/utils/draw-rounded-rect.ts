import Canvas from "../lib/canvas/Canvas";

export default function drawRoundedRect(ctx: CanvasRenderingContext2D, node, r: number, isSelected) {
    const w = node.width, h = node.height, x = node.x, y = node.y


    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.lineWidth = isSelected ? 2 : 1
    ctx.strokeStyle = isSelected ? "darkorange" : Canvas.borderColor;
    ctx.fillStyle = Canvas.rectColor;


    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r)
    ctx.stroke()
    ctx.fill()
}