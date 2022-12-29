import Canvas from "../lib/Canvas";
import ShaderLink from "../lib/nodes/ShaderLink";
import type ShaderNode from "../lib/nodes/ShaderNode";
import type {Output} from "../lib/nodes/ShaderNode";

export default function handleLink(canvasAPI:Canvas, event:MouseEvent,x:number,y:number, sourceNode:ShaderNode, sourceIO:Output){
    const N = canvasAPI.nodes
    const X = (event.clientX - x) / Canvas.scale
    const Y = (event.clientY - y) / Canvas.scale

    for (let i = N.length - 1; i >= 0; i--) {
        const node = N[i]
        const onBody = node.checkBodyClick(X, Y)
        if (onBody) {
            const targetIO = node.checkAgainstIO(X, Y, true)
            if (targetIO && targetIO.accept.includes(sourceIO.type)) {
                canvasAPI.links.push(new ShaderLink(node, sourceNode, targetIO, sourceIO))
            }else if(targetIO){
                // TODO - DO ALERT FOR NOT ACCEPTING TYPE
            }

            break
        }
    }
}