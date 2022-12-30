import Canvas from "../lib/Canvas";
import ShaderLink from "../lib/nodes/ShaderLink";
import type ShaderNode from "../lib/nodes/ShaderNode";
import type {Output, Input} from "../lib/nodes/ShaderNode";

export default function handleLink(canvasAPI:Canvas, event:MouseEvent,x:number,y:number, sourceNode:ShaderNode, sourceIO:Output){
    if(!sourceIO || !sourceNode)
        return
    const N = canvasAPI.nodes
    const X = (event.clientX - x) / Canvas.scale
    const Y = (event.clientY - y) / Canvas.scale

    for (let i = N.length - 1; i >= 0; i--) {
        const node = N[i]
        const onBody = node.checkBodyClick(X, Y)
        if (onBody) {
            const targetIO = node.checkAgainstIO<Input>(X, Y, true)
            if (targetIO && targetIO.accept.includes(sourceIO.type)) {
                const foundExisting = canvasAPI.links.findIndex(l => l.targetRef === targetIO)
                const newLink = new ShaderLink(node, sourceNode, targetIO, sourceIO)
                if(foundExisting > -1)
                    canvasAPI.links[foundExisting] = newLink
                else
                    canvasAPI.links.push(newLink)
            }else if(targetIO){
                // TODO - DO ALERT FOR NOT ACCEPTING TYPE
            }

            break
        }
    }
}