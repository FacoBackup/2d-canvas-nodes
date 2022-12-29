import Canvas from "../lib/Canvas";

export default function drawRoundedRect(ctx: CanvasRenderingContext2D, node, r: number, isSelected:boolean, isFirstSelected:boolean) {
    const w = node.width, h = node.height, x = node.x, y = node.y


    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    let outlineColor = Canvas.borderColor
    if(isSelected)
        outlineColor = isFirstSelected ? "white" : "darkorange"
    ctx.lineWidth = isSelected ? 2: 1
    ctx.strokeStyle = outlineColor
    ctx.fillStyle = Canvas.rectColor;


    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r)
    ctx.stroke()
    ctx.fill()
}