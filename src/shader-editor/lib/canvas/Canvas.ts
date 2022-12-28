import dragNode from "../../utils/drag-node";
import getMousedownEvent from "../../utils/get-mousedown-event";
import getCanvasZoomEvent from "../../utils/get-canvas-zoom-event";
import type ShaderNode from "../nodes/ShaderNode";
import type ShaderLink from "../nodes/ShaderLink";
import drawLink from "../../utils/draw-link";


export default class Canvas {
    static grid = 20
    static scale = 1
    static width = 5000
    static height = 5000
    static backgroundColor = "#292929"
    static fontSize = 10
    static rectColor = "#353535"
    static borderColor = "#6b6b6b"
    #nodes:ShaderNode[] = []
    #links:ShaderLink[] = []
    set links(nodes) {
        this.#links = nodes
        this.clear()
    }

    get links() {
        return this.#links
    }

    set nodes(nodes) {
        this.#nodes = nodes
        this.clear()
    }

    get nodes() {
        return this.#nodes
    }

    ctx?: CanvasRenderingContext2D
    private canvas?: HTMLCanvasElement
    private initialized = false
    nodesOnDrag: { onMouseUp:Function,onMouseMove:Function }[] = []
    selectionMap = new Map<string, ShaderNode>()

    updateCanvasSize() {
        this.canvas.width = Canvas.width
        this.canvas.height = Canvas.height
        this.canvas.style.width = Canvas.width + "px"
        this.canvas.style.height = Canvas.height + "px"
    }

    initialize(canvas: HTMLCanvasElement) {
        if (this.initialized)
            return
        this.initialized = true
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.updateCanvasSize()

        canvas.addEventListener("contextmenu", e => e.preventDefault())
        document.addEventListener("mousedown", getMousedownEvent(this, canvas))

        canvas.addEventListener("wheel", getCanvasZoomEvent(this, canvas), {passive: false})
        this.clear()
    }

    clear() {
        const ctx = this.ctx
        const canvas = this.canvas
        const scale = Canvas.scale || .01

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.setTransform(scale, 0, 0, scale, 0, 0)
        this.draw()
    }

    private draw() {
        const L = this.#links
        const LS = L.length
        for (let i = 0; i < LS; i++) {
            const link = L[i]
            drawLink(this.ctx, link)
        }

        const N = this.#nodes
        const NS = N.length
        for (let i = 0; i < NS; i++) {
            const node = N[i]
            node.drawToCanvas(this.ctx, this.selectionMap)
        }

    }
}