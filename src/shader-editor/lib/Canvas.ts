import getMousedownEvent from "../utils/get-mousedown-event";
import getCanvasZoomEvent from "../utils/get-canvas-zoom-event";
import type ShaderNode from "./nodes/ShaderNode";
import type ShaderLink from "./nodes/ShaderLink";
import type Comment from "./nodes/Comment";
import CanvasRenderer from "../utils/CanvasRenderer";


export default class Canvas {
    static grid = 20
    static scale = 1
    static width = 5000
    static height = 5000
    static backgroundColor = "#292929"
    static fontSize = 10
    static rectColor = "#353535"
    static borderColor = "#6b6b6b"

    get rectColor() {
        return Canvas.rectColor
    }

    nodes: ShaderNode[] = []
    links: ShaderLink[] = []
    comments: Comment[] = []



    ctx?: CanvasRenderingContext2D
    private canvas?: HTMLCanvasElement
    private initialized = false

    selectionMap = new Map<string, ShaderNode|Comment>()
    lastSelection: ShaderNode | Comment | undefined

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
        const ctx = this.ctx
        const C = this.comments
        const CS = C.length
        for (let i = 0; i < CS; i++) {
            C[i].draw(ctx, this)
        }

        const L = this.links
        const LS = L.length
        for (let i = 0; i < LS; i++)
            CanvasRenderer.drawLink(ctx, L[i])


        const N = this.nodes
        const NS = N.length
        for (let i = 0; i < NS; i++)
            N[i].drawToCanvas(ctx, this)


    }
}