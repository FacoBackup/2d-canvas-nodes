import type ShaderNode from "./ShaderNode";
import type {Input, Output} from "./ShaderNode";

export default class ShaderLink {
    targetRef:Input
    sourceRef:Output
    targetNode:ShaderNode
    sourceNode:ShaderNode
    target:string
    source:string
    identifier:string
    targetKey:string
    sourceKey:string
    sourceType:string
    targetType:string

    static getPattern(l) {
        return l.target + "-" + l.source
    }

    constructor(target:ShaderNode, source:ShaderNode, tR:Input, sR:Output) {
        this.targetNode = target
        this.sourceNode = source
        this.targetRef = tR
        this.sourceRef = sR

        this.target = this.targetRef.id + this.targetRef.key
        this.source = this.sourceRef.id + this.sourceRef.key
        this.identifier = ShaderLink.getPattern(this)

        this.targetKey = this.targetRef.key
        this.sourceKey = this.sourceRef.key
        this.sourceType = this.sourceRef.type
        this.targetType = this.targetRef.type
    }
}