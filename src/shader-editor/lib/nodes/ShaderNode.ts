import IO_RADIUS from "../../static/IO_RADIUS";
import HEADER_HEIGHT from "../../static/HEADER_HEIGHT";
import type Canvas from "../Canvas";
import DATA_TYPES from "../../static/DATA_TYPES";
import Draggable from "./Draggable";
import CanvasRenderer from "../../utils/CanvasRenderer";

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


export default class ShaderNode extends Draggable {
    [key: string]: any


    minWidth = 150
    uniform = false
    targetCommentID: string | undefined
    canBeDeleted = true
    dynamicInputs = false
    uniformName: string
    output: Output[]
    inputs: Input[]

    constructor(inputs: Input[], output?: Output[], dynamicInputs?: boolean) {
        super()
        this.x = 10
        this.y = 10
        this.uniformName = "DYNAMIC_" + this.id.replaceAll("-", "_")
        this.output = output
        this.inputs = inputs ? inputs : []
        this.minHeight = this.height = HEADER_HEIGHT + (Math.max(this.output.length, this.inputs.filter(e => e.accept !== undefined).length) + .5) * (HEADER_HEIGHT - 5)
        this.dynamicInputs = dynamicInputs
    }

    static getMinimalType(...typesToCompare): string | undefined {
        const min = Math.min(...typesToCompare.map(t => types[t]).filter(t => t !== undefined))
        return typesInverted[min]
    }

    static getIOColor(attribute: Output | Input) {
        const type = attribute.type || attribute.accept?.[0]
        switch (type) {
            case DATA_TYPES.VEC2:
            case DATA_TYPES.COLOR:
            case DATA_TYPES.VEC3:
            case DATA_TYPES.VEC4:
                return "orange"
            case DATA_TYPES.TEXTURE:
                return "purple"
            case DATA_TYPES.ANY:
                return "white"
            default:
                return "#999"
        }
    }

    checkAgainstIO<T>(x: number, y: number, asInput?: boolean): T {
        const R2 = IO_RADIUS ** 2
        const data = asInput ? this.inputs : this.output
        let validIndex = 0

        for (let i = 0; i < data.length; i++) {
            if (asInput && !data[i].accept || data[i].disabled)
                continue

            const linePosition = ShaderNode.getIOPosition(validIndex, this, !asInput)
            const xIO = linePosition.x
            const yIO = linePosition.y
            validIndex++

            if ((x - xIO) ** 2 + (y - yIO) ** 2 < R2)
                return <T>data[i]
        }
    }

    drawToCanvas(ctx: CanvasRenderingContext2D, canvasAPI: Canvas) {
        CanvasRenderer.drawRoundedRect(ctx, this, 3, canvasAPI.selectionMap.get(this.id) !== undefined, canvasAPI.lastSelection === this, canvasAPI.rectColor)
        CanvasRenderer.drawNodeHeader(ctx, this, this.type)

        for (let j = 0; j < this.output.length; j++) {
            const C = this.output[j]
            CanvasRenderer.drawIO(ctx, true, this, j, C)
        }
        let validIndex = 0
        for (let j = 0; j < this.inputs.length; j++) {
            const C = this.inputs[j]
            if (C.accept || C.type === DATA_TYPES.COLOR || C.type === DATA_TYPES.TEXTURE) {
                CanvasRenderer.drawIO(ctx, false, this, validIndex, C)
                validIndex++
            }
        }
        this.drawScale(ctx)
    }

    static getIOPosition(index: number, node: ShaderNode, asOutput: boolean): { x: number, y: number, height: number, width: number, rowY: number } {
        const xN = node.x, yN = node.y, w = node.width
        const H = HEADER_HEIGHT - 5
        const Y = yN + H * (index + 2)
        const xIO = !asOutput ? xN : xN + w
        const yIO = Y - IO_RADIUS


        return {x: xIO, y: yIO, height: H, width: w, rowY: Y}
    }
}