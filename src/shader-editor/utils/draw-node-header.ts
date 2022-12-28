import Canvas from "../lib/canvas/Canvas";

export default function drawNodeHeader(ctx:CanvasRenderingContext2D, node){
    const name = node.name
    ctx.beginPath()
    ctx.font =  "10px Arial";
    ctx.fillStyle = "#f0f0f0"
    ctx.fillText(name, node.x + 5, node.y + Canvas.fontSize + 5);

    ctx.lineWidth = 1
    ctx.moveTo(node.x, node.y+23)
    ctx.lineTo(node.x + node.width, node.y + 23)
    ctx.stroke()
    ctx.closePath()

}