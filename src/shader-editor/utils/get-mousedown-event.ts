import dragNode from "./drag-node";
import Canvas from "../lib/Canvas";
import type {Output} from "../lib/nodes/ShaderNode";
import type MutableObject from "../static/MutableObject";
import drawBezierCurve from "./draw-bezier-curve";
import IO_RADIUS from "../static/IO_RADIUS";
import ShaderLink from "../lib/nodes/ShaderLink";
import type ShaderNode from "../lib/nodes/ShaderNode";
import handleLink from "./handle-link";

export default function getMousedownEvent(canvasAPI: Canvas, canvas: HTMLCanvasElement): (this: HTMLCanvasElement, ev: WheelEvent) => void {
    let isOnScroll = false
    let IO: [ShaderNode, Output]
    let parentBBox: MutableObject
    const tempLink = {x: 0, y: 0, x1: 0, y1: 0}
    const N = canvasAPI.nodesOnDrag

    const handleMouseMove = (event) => {
        if (isOnScroll) {
            canvas.parentElement.scrollTop -= event.movementY
            canvas.parentElement.scrollLeft -= event.movementX
        } else {
            const S = N.length
            if (IO !== undefined) {
                tempLink.x1 = (event.clientX + parentBBox.x) / Canvas.scale
                tempLink.y1 = (event.clientY + parentBBox.y) / Canvas.scale

                canvasAPI.clear()
                canvasAPI.ctx.strokeStyle = "#0095ff"
                drawBezierCurve(canvasAPI.ctx, tempLink.x, tempLink.x1, tempLink.y, tempLink.y1)
            } else if (S > 0) {
                for (let i = 0; i < S; i++)
                    N[i].onMouseMove(event)
                canvasAPI.clear()
            }
        }
    }

    return e => {
        const BBox = canvas.getBoundingClientRect()
        parentBBox = canvas.parentElement.getBoundingClientRect()
        isOnScroll = e.button === 2

        if (!isOnScroll) {
            const N = canvasAPI.nodes
            const X = (e.clientX - BBox.x) / Canvas.scale
            const Y = (e.clientY - BBox.y) / Canvas.scale

            if (!e.ctrlKey) {
                canvasAPI.lastSelection = undefined
                canvasAPI.selectionMap.clear()
            }
            else
                canvasAPI.selectionMap.forEach(node => {
                    canvasAPI.nodesOnDrag.push(dragNode(e, node, canvas.parentElement, parentBBox))
                })

            for (let i = N.length - 1; i >= 0; i--) {
                const node = N[i]
                const onBody = node.checkBodyClick(X, Y)
                const onHeader = node.checkHeaderClick(X, Y)
                if (onHeader || onBody) {
                    if (onHeader)
                        canvasAPI.nodesOnDrag.push(dragNode(e, node, canvas.parentElement, parentBBox))
                    else if (!e.ctrlKey) {
                        const isInside = node.checkAgainstIO(X, Y)

                        if (isInside) {
                            IO = [node, isInside]
                            tempLink.x = (e.clientX + parentBBox.x + IO_RADIUS / 2) / Canvas.scale
                            tempLink.y = (e.clientY + parentBBox.y) / Canvas.scale
                        }
                    }
                    canvasAPI.selectionMap.set(node.id, node)
                    canvasAPI.lastSelection = node
                    break
                }
            }
            if(canvasAPI.nodesOnDrag.length > 0 || IO)
                canvasAPI.ctx.canvas.style.cursor = "grabbing"
            canvasAPI.clear()
        }
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", e => {
            if (IO) handleLink(canvasAPI, e, BBox.x, BBox.y, IO[0], IO[1])
            isOnScroll = false
            IO = undefined
            const N = canvasAPI.nodesOnDrag
            for (let i = 0; i < N.length; i++)
                N[i].onMouseUp()
            canvasAPI.nodesOnDrag.length = 0
            document.removeEventListener("mousemove", handleMouseMove)
            canvasAPI.clear()
            canvasAPI.ctx.canvas.style.cursor = "default"
        }, {once: true})
    }
}