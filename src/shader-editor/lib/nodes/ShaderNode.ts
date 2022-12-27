import type MutableObject from "../../static/MutableObject";
import RoundedRect from "../../utils/RoundedRect";
import drawIO from "../../utils/draw-IO";

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
    size = 0
    width =200
    height = 35
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
        this.height = 35 + Math.max(this.output.length, this.inputs.length) * 20
        this.dynamicInputs = dynamicInputs
    }

    static getMinimalType(...typesToCompare): string | undefined {
        const min = Math.min(...typesToCompare.map(t => types[t]).filter(t => t !== undefined))
        return typesInverted[min]
    }
    checkClick(x, y){
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height
    }
    drawToCanvas(ctx:CanvasRenderingContext2D){
        RoundedRect.draw(ctx, this.x, this.y, this.width, this.height, 1, 5)
        for(let j = 0; j < this.output.length; j++){
            const C = this.output[j]
            drawIO(ctx, true, this.x , this.y,  this.width, j, C.label, !C.disabled)
        }
        for(let j = 0; j < this.inputs.length; j++){
            const C = this.inputs[j]
            drawIO(ctx, false, this.x , this.y, this.width, j, C.label, !C.disabled)
        }
    }
}