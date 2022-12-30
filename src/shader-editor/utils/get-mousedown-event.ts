import Canvas from "../lib/Canvas";
import type {Output} from "../lib/nodes/ShaderNode";
import type MutableObject from "../static/MutableObject";
import drawBezierCurve from "./draw-bezier-curve";
import IO_RADIUS from "../static/IO_RADIUS";
import ShaderLink from "../lib/nodes/ShaderLink";
import type ShaderNode from "../lib/nodes/ShaderNode";
import handleLink from "./handle-link";
import getIOPosition from "./get-IO-position";
import Draggable from "../lib/Draggable";


export default function getMousedownEvent(canvasAPI: Canvas, canvas: HTMLCanvasElement): (this: HTMLCanvasElement, ev: WheelEvent) => void {
    const nodesOnDrag: { onMouseUp: Function, onMouseMove: Function }[] = []

    const parentElement = canvas.parentElement
    let isOnScroll = false
    let IO: [ShaderNode, Output]
    let parentBBox: MutableObject
    const tempLink = {x: 0, y: 0, x1: 0, y1: 0}

    const handleMouseMove = (event) => {
        if (isOnScroll) {
            parentElement.scrollTop -= event.movementY
            parentElement.scrollLeft -= event.movementX
        } else {
            const S = nodesOnDrag.length
            if (IO !== undefined) {
                tempLink.x1 = (event.clientX + parentBBox.x + parentElement.scrollLeft - IO_RADIUS) / Canvas.scale
                tempLink.y1 = (event.clientY + parentBBox.y + parentElement.scrollTop- IO_RADIUS) / Canvas.scale

                canvasAPI.clear()
                canvasAPI.ctx.strokeStyle = "#0095ff"
                drawBezierCurve(canvasAPI.ctx, tempLink.x, tempLink.x1, tempLink.y, tempLink.y1)
            } else if (S > 0) {
                for (let i = 0; i < S; i++)
                    nodesOnDrag[i].onMouseMove(event)
                canvasAPI.clear()
            }
        }
    }

    return e => {
        const BBox = canvas.getBoundingClientRect()
        parentBBox = parentElement.getBoundingClientRect()
        isOnScroll = e.button === 2

        if (!isOnScroll) {
            const N = canvasAPI.nodes
            const C = canvasAPI.comments
            const X = (e.clientX - BBox.x) / Canvas.scale
            const Y = (e.clientY - BBox.y) / Canvas.scale

            if (!e.ctrlKey) {
                canvasAPI.lastSelection = undefined
                canvasAPI.selectionMap.clear()
            } else
                canvasAPI.selectionMap.forEach(node => {
                    nodesOnDrag.push(Draggable.drag(e, node, true))
                })

            let wasBroken = false
            for (let i = N.length - 1; i >= 0; i--) {
                const node = N[i]
                const onBody = node.checkBodyClick(X, Y)
                const onHeader = node.checkHeaderClick(X, Y)
                if (onHeader || onBody) {
                    if (onHeader)
                        nodesOnDrag.push(Draggable.drag(e, node, true))
                    else if (!e.ctrlKey) {
                        const isOnScale = node.checkAgainstScale(X, Y)
                        if(isOnScale)
                            nodesOnDrag.push(Draggable.drag(e, node, false))
                        else {
                            const output = node.checkAgainstIO<Output>(X, Y)
                            if (output) {
                                IO = [node, output]
                                const position = getIOPosition(node.output.indexOf(output), node, true)
                                tempLink.x = position.x
                                tempLink.y = position.y
                            }
                        }
                    }
                    canvasAPI.selectionMap.set(node.id, node)
                    canvasAPI.lastSelection = node
                    wasBroken = true
                    break
                }
            }

            if (!wasBroken)
                for (let i = C.length - 1; i >= 0; i--) {
                    const comment = C[i]
                    const onBody = comment.checkBodyClick(X, Y)
                    const onHeader = comment.checkHeaderClick(X, Y)
                    if (onHeader || onBody) {
                        if (onHeader)
                            nodesOnDrag.push(Draggable.drag(e, comment, true))
                        else if (!e.ctrlKey) {
                            const isOnScale = comment.checkAgainstScale(X, Y)
                            if(isOnScale)
                                nodesOnDrag.push(Draggable.drag(e, comment, false))
                        }
                        canvasAPI.selectionMap.set(comment.id, comment)
                        canvasAPI.lastSelection = comment
                        break
                    }
                }

            if (nodesOnDrag.length > 0 || IO)
                canvasAPI.ctx.canvas.style.cursor = "grabbing"
            canvasAPI.clear()
        }
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", e => {
            if (IO) handleLink(canvasAPI, e, BBox.x, BBox.y, IO[0], IO[1])
            isOnScroll = false
            IO = undefined
            tempLink.x = tempLink.y = tempLink.x1 = tempLink.y1 = 0

            for (let i = 0; i < nodesOnDrag.length; i++)
                nodesOnDrag[i].onMouseUp()
            nodesOnDrag.length = 0
            document.removeEventListener("mousemove", handleMouseMove)
            canvasAPI.clear()
            canvasAPI.ctx.canvas.style.cursor = "default"
        }, {once: true})
    }
}