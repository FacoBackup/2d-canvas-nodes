import type MutableObject from "../../static/MutableObject";
import drawIO from "../../utils/draw-IO";
import drawRoundedRect from "../../utils/draw-rounded-rect";
import drawNodeHeader from "../../utils/draw-node-header";
import IO_RADIUS from "../../static/IO_RADIUS";
import HEADER_HEIGHT from "../../static/HEADER_HEIGHT";

const types = {
    vec2: 0,
    vec3: 1,
    vec4: 2
}
const typesInverted = ["vec2", "vec3", "vec4"]

export interface Output {
    [key: string]: any

    label: string
    key: string
    type: string
}

export interface Input {
    [key: string]: any

    label: string
    key: string
    accept?: string[]
    type?: string
    disabled?: boolean
}


export default class ShaderNode {
    [key: string]: any

    canBeDeleted = true
    dynamicInputs = false
    width = 200
    height = HEADER_HEIGHT
    x: number
    y: number
    id: string
    uniformName: string
    output: MutableObject[]
    inputs: MutableObject[]

    constructor(inputs: Input[], output?: Output[], dynamicInputs?: boolean) {
        this.x = 10
        this.y = 10
        this.id = crypto.randomUUID()
        this.uniformName = "DYNAMIC_" + this.id.replaceAll("-", "_")
        this.output = output
        this.inputs = inputs ? inputs : []
        this.height = HEADER_HEIGHT + Math.max(this.output.length, this.inputs.filter(e => e.accept !== undefined).length) * 20
        this.dynamicInputs = dynamicInputs
    }

    static getMinimalType(...typesToCompare): string | undefined {
        const min = Math.min(...typesToCompare.map(t => types[t]).filter(t => t !== undefined))
        return typesInverted[min]
    }

    checkHeaderClick(x: number, y: number): boolean {
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + HEADER_HEIGHT
    }

    checkBodyClick(x: number, y: number): boolean {
        const XI = this.x - 4, XF = this.x + 4 + this.width

        const Y = this.y + HEADER_HEIGHT
        return x >= XI && x < XF && y >= Y && y < Y + this.height - HEADER_HEIGHT
    }

    checkAgainstIO(x: number, y: number, asInput?:boolean): Output | undefined {
        const node = this
        const xN = node.x, yN = node.y, w = node.width
        let returnData
        const R2 = IO_RADIUS**2
        const T = asInput ? this.inputs : this.output
        for (let i = 0; i < T.length; i++) {
            const H_OFFSET = 20
            const H = 20
            const Y = yN + H * (i + 1) + H_OFFSET
            const xIO = asInput ? xN : xN + w
            const yIO = Y - IO_RADIUS

            console.log(x, y, xIO, yIO)
            if ((x - xIO)**2 + (y - yIO)**2 < R2) {
                returnData = T[i]
                break
            }
        }
        return returnData
    }

    drawToCanvas(ctx: CanvasRenderingContext2D, selectionMap: Map<string, ShaderNode>) {
        drawRoundedRect(ctx, this, 3, selectionMap.get(this.id) !== undefined)
        drawNodeHeader(ctx, this)
        for (let j = 0; j < this.output.length; j++) {
            const C = this.output[j]
            drawIO(ctx, true, this, j, C)
        }
        for (let j = 0; j < this.inputs.length; j++) {
            const C = this.inputs[j]
            if (C.accept)
                drawIO(ctx, false, this, j, C)
        }
    }
}