import type MutableObject from "../../static/MutableObject";
import drawIO from "../../utils/draw-IO";
import drawRoundedRect from "../../utils/draw-rounded-rect";
import drawNodeHeader from "../../utils/draw-node-header";

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


const HEADER_HEIGHT = 25
export default class ShaderNode {
    [key: string]: any
    canBeDeleted = true
    dynamicInputs = false
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
        this.height = HEADER_HEIGHT + Math.max(this.output.length, this.inputs.filter(e => e.accept !== undefined).length) * 20
        this.dynamicInputs = dynamicInputs
    }

    static getMinimalType(...typesToCompare): string | undefined {
        const min = Math.min(...typesToCompare.map(t => types[t]).filter(t => t !== undefined))
        return typesInverted[min]
    }
    checkClick(x, y){
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + HEADER_HEIGHT
    }
    drawToCanvas(ctx:CanvasRenderingContext2D, selectionMap:Map<string,boolean>){
        drawRoundedRect(ctx, this,  3, selectionMap.get(this.id))
        drawNodeHeader(ctx, this)
        for(let j = 0; j < this.output.length; j++){
            const C = this.output[j]
            drawIO(ctx, true, this, j, C)
        }
        for(let j = 0; j < this.inputs.length; j++){
            const C = this.inputs[j]
            if(C.accept)
            drawIO(ctx, false,this,j, C)
        }
    }
}