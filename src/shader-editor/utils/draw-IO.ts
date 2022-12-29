import Canvas from "../lib/Canvas";
import NODE_TYPES from "../static/NODE_TYPES";
import DATA_TYPES from "../static/DATA_TYPES";
import drawRoundedRect from "./draw-rounded-rect";
import IO_RADIUS from "../static/IO_RADIUS";
import HEADER_HEIGHT from "../static/HEADER_HEIGHT";
import ShaderNode, {Input, Output} from "../lib/nodes/ShaderNode";

export default function drawIO(ctx: CanvasRenderingContext2D, asOutput:boolean, node:ShaderNode, index:number, attribute:Input|Output) {
    ctx.font = asOutput ? "bold 8px Arial" : "8px Arial";

    const isColor = attribute.type === DATA_TYPES.COLOR
    const isTexture = attribute.type === DATA_TYPES.TEXTURE
    const enabled = !attribute.disabled
    const label = attribute.label
    const x = node.x, y = node.y, w = node.width
    const LABEL_OFFSET = 13
    const H = HEADER_HEIGHT - 5
    const Y = y + H * (index + 2)
    let X = !asOutput ? x : x + w
    const YA = Y - IO_RADIUS
    const labelSize = ctx.measureText(label).width + LABEL_OFFSET
    const T_SIZE = ctx.measureText("T").width

    ctx.beginPath()


    if(isColor && !attribute.accept){
        const data = node[attribute.key]
        if(!data)
            return;
        ctx.fillStyle = `rgb(${data[0]*255},${data[1]*255},${data[2]*255})`
        ctx.roundRect(X + IO_RADIUS, Y - H/2, w/2, H, 3)
        ctx.fill()
        return
    }
  // if(isTexture){
  //     const data = node[attribute.key]?.label
  //     if(!data)
  //
  //     ctx.fillStyle = "#d7d7d7"
  //     ctx.fillText(label, X - labelSize + LABEL_OFFSET, Y - T_SIZE / 2);
  //     return
  // }

    ctx.fillStyle = ShaderNode.getIOColor(attribute)
    ctx.strokeStyle = Canvas.borderColor
    ctx.lineWidth = .5
    ctx.arc(X, YA, IO_RADIUS, 0, Math.PI * 2)
    ctx.fill()
    if (asOutput) {
        X -= T_SIZE * 2
    } else
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