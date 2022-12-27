import {listenTo} from "../../utils/drag-node";

export default class Canvas {
    static grid = 20
    static scale = 1
    static width = 5000
    static height = 5000
    static backgroundColor = "#292929"
    static fontSize = 10
    static rectColor = "#353535"
    static borderColor = "#6b6b6b"
    #nodes = []
    set nodes(nodes) {
        this.#nodes = nodes
        this.clear()
    }

    get nodes() {
        return this.#nodes
    }

    private ctx?: CanvasRenderingContext2D
    private canvas?: HTMLCanvasElement
    private initialized = false

    private nodesOnDrag = []

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

        let isOnDrag = false
        canvas.addEventListener("contextmenu", e => e.preventDefault())

        const handleMouseMove = (event) => {
            if (isOnDrag) {
                canvas.parentElement.scrollTop -= event.movementY
                canvas.parentElement.scrollLeft -= event.movementX
            } else {
                const N = this.nodesOnDrag
                for (let i = 0; i < N.length; i++) {
                    N[i].onMouseMove(event)
                }
                this.clear()
            }
        }

        document.addEventListener("mousedown", e => {
            const BBox = canvas.getBoundingClientRect()
            isOnDrag = e.button === 2

            if (!isOnDrag) {
                const N = this.nodes
                const X = (e.clientX - BBox.x) / Canvas.scale,
                    Y = (e.clientY - BBox.y) / Canvas.scale
                for (let i = 0; i < N.length; i++) {
                    const node = N[i]
                    console.log(
                        node.x,
                        node.y,
                        X, Y
                    )
                    if (node.checkClick(X, Y)) {
                        this.nodesOnDrag.push(listenTo(e, node, canvas.parentElement))
                        break
                    }
                }
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", e => {
                isOnDrag = false
                const N = this.nodesOnDrag
                for (let i = 0; i < N.length; i++) {
                    N[i].onMouseUp()
                }
                this.nodesOnDrag = []
                document.removeEventListener("mousemove", handleMouseMove)
            }, {once: true})

        })
        canvas.addEventListener("wheel", e => {
            e.preventDefault()
            let s = Canvas.scale
            if (e.wheelDelta > 0 && s < 3)
                s += s * .1
            else if (e.wheelDelta < 0 && s >= .5)
                s -= s * .1
            Canvas.scale = s
            canvas.style.backgroundSize = `${20 * s}px ${20 * s}px`
            this.clear()
        }, {passive: false})
        this.clear()
    }

    private clear() {
        const ctx = this.ctx
        const canvas = this.canvas
        const scale = Canvas.scale || .01

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.setTransform(scale, 0, 0, scale, 0, 0)
        this.draw()
    }

    private draw() {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i]
            node.drawToCanvas(this.ctx)
        }
        // BezierCurve(this.ctx, 10, 100, 10, 100)
    }
}