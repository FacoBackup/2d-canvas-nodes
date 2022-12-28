import ShaderNode from "./ShaderNode"

import checkGlslFloat from "../../utils/check-glsl-float"
import DATA_TYPES from "../../static/DATA_TYPES";
import NODE_TYPES from "../../static/NODE_TYPES";


export default class RGB extends ShaderNode {
    rgb = [0, 0, 0]
    uniform = false

    constructor() {
        super([
            {
                label: "Dynamic",
                key: "uniform",
                type: DATA_TYPES.CHECKBOX
            },
            {label: "Color", key: "rgb", type: DATA_TYPES.COLOR},
        ], [
            {label: "Value", key: "COLOR_RGB", type: DATA_TYPES.VEC3},
        ])
        this.name = "RGB"
    }

    get type() {
        return this.uniform ?NODE_TYPES.VARIABLE : NODE_TYPES.STATIC
    }

    async getInputInstance(index, uniforms, uniformValues) {
        const v = this.rgb
        if (this.uniform) {
            uniformValues.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.VEC3,
                data: v,
                isColor: true,
                internalKey: "rgb"
            })
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.VEC3,
            })

            return `uniform vec3 ${this.uniformName};`
        }
        return `const vec3 ${this.uniformName}  = vec3(${checkGlslFloat(v[0])}, ${checkGlslFloat(v[1])}, ${checkGlslFloat(v[2])});`

    }

    getFunctionCall() {
        this.COLOR_RGB = this.uniformName
        return ""
    }
}