import IO_RADIUS from "../static/IO_RADIUS";
import type ShaderNode from "../lib/nodes/ShaderNode";
import HEADER_HEIGHT from "../static/HEADER_HEIGHT";

type result = { x: number, y: number, height: number,width:number, rowY: number }
export default function getIOPosition(index: number, node: ShaderNode, asOutput: boolean): result {
    const xN = node.x, yN = node.y, w = node.width
    const H = HEADER_HEIGHT - 5
    const Y = yN + H * (index + 2)
    const xIO = !asOutput ? xN : xN + w
    const yIO = Y - IO_RADIUS


    return {x: xIO, y: yIO, height: H, width: w, rowY: Y}
}