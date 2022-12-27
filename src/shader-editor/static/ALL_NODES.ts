import Add from "../lib/nodes/math/Add"
import TextureSample from "../lib/nodes/TextureSample"
import TextureCoords from "../lib/nodes/static/TextureCoords"
import Float from "../lib/nodes/math/Float"
import ElapsedTime from "../lib/nodes/static/ElapsedTime"
import Multiply from "../lib/nodes/math/Multiply"
import Sine from "../lib/nodes/math/Sine"
import Divide from "../lib/nodes/math/Divide"
import Max from "../lib/nodes/math/Max"
import Min from "../lib/nodes/math/Min"
import RGB from "../lib/nodes/RGB"
import AbsoluteWorldPosition from "../lib/nodes/static/AbsoluteWorldPosition"
import CameraCoords from "../lib/nodes/static/CameraCoords"
import NormalVector from "../lib/nodes/static/NormalVector"
import ToTangentSpace from "../lib/nodes/static/ToTangentSpace"
import ViewDirection from "../lib/nodes/static/ViewDirection"
import ParallaxOcclusionMapping from "../lib/nodes/ParallaxOcclusionMapping"
import PerlinNoise from "../lib/nodes/math/PerlinNoise"
import BreakVector from "../lib/nodes/vec/BreakVector"
import DotProduct from "../lib/nodes/vec/DotProduct"
import LinearInterpolate from "../lib/nodes/vec/LinearInterpolate"
import Vec4 from "../lib/nodes/vec/Vec4"
import Vec3 from "../lib/nodes/vec/Vec3"
import Vec2 from "../lib/nodes/vec/Vec2"
import OneMinus from "../lib/nodes/math/OneMinus"
import Saturate from "../lib/nodes/math/Saturate"
import Clamp from "../lib/nodes/math/Clamp"
import Saturation from "../lib/nodes/math/Saturation"
import Pow from "../lib/nodes/math/Pow"
import SceneColor from "../lib/nodes/SceneColor"
import Refract from "../lib/nodes/math/Refract"

import Reflect from "../lib/nodes/math/Reflect"
import Normalize from "../lib/nodes/math/Normalize"
import DDY from "../lib/nodes/math/DDY"
import DDX from "../lib/nodes/math/DDX"
import SineH from "../lib/nodes/math/SineH"
import CosineH from "../lib/nodes/math/CosineH"
import Cosine from "../lib/nodes/math/Cosine"
import MakeVector from "../lib/nodes/vec/MakeVector"

export const ALL_NODES = [
    {
        label: "MakeVector",
        dataTransfer: "MakeVector",
        tooltip: "MakeVector.",
        
        getNewInstance: () => new MakeVector()
    },
    {
        label: "Cosine",
        dataTransfer: "Cosine",
        tooltip: "Cosine.",
        
        getNewInstance: () => new Cosine()
    },
    {
        label: "CosineH",
        dataTransfer: "CosineH",
        tooltip: "Hyperbolic cosine.",
        
        getNewInstance: () => new CosineH()
    },
    {
        label: "SineH",
        dataTransfer: "SineH",
        tooltip: "Hyperbolic sine.",
        
        getNewInstance: () => new SineH()
    },
    {
        label: "DDX",
        dataTransfer: "DDX",
        tooltip: "Partial derivative X.",
        
        getNewInstance: () => new DDX()
    },
    {
        label: "DDY",
        dataTransfer: "DDY",
        tooltip: "Partial derivative Y.",
        
        getNewInstance: () => new DDY()
    },
    {
        label: "Normalize",
        dataTransfer: "Normalize",
        tooltip: "Normalize vector.",
        
        getNewInstance: () => new Normalize()
    },
    {
        label: "Reflect",
        dataTransfer: "Reflect",
        tooltip: "Reflect vector.",
        
        getNewInstance: () => new Reflect()
    },
    {
        label: "Refract",
        dataTransfer: "Refract",
        tooltip: "Refract vector.",
        
        getNewInstance: () => new Refract()
    },



    {
        label: "SceneColor",
        dataTransfer: "SceneColor",
        tooltip: "Scene color.",
        
        getNewInstance: () => new SceneColor()
    },
    {
        label: "Pow",
        dataTransfer: "Pow",
        tooltip: "Power to exponent.",
        
        getNewInstance: () => new Pow()
    },
    {
        label: "Saturation",
        dataTransfer: "Saturation",
        tooltip: "Adjust saturation.",
        
        getNewInstance: () => new Saturation()
    },
    {
        label: "Saturate",
        dataTransfer: "Saturate",
        tooltip: "Clamp between 0 and 1.",
        
        getNewInstance: () => new Saturate()
    },
    {
        label: "Clamp",
        dataTransfer: "Clamp",
        tooltip: "One minus X.",
        
        getNewInstance: () => new Clamp()
    },
    {
        label: "1-X (OneMinusX)",
        dataTransfer: "OneMinus",
        tooltip: "One minus X.",
        
        getNewInstance: () => new OneMinus()
    },
    {
        label: "Vec2",
        dataTransfer: "Vec2",
        tooltip: "2D vector.",
        
        getNewInstance: () => new Vec2()
    },
    {
        label: "Vec3",
        dataTransfer: "Vec3",
        tooltip: "3D vector.",
        
        getNewInstance: () => new Vec3()
    },
    {
        label: "Vec4",
        dataTransfer: "Vec4",
        tooltip: "4D vector.",
        
        getNewInstance: () => new Vec4()
    },
    {
        label: "BreakVector",
        dataTransfer: "BreakVector",
        tooltip: "Break vector.",
        
        getNewInstance: () => new BreakVector()
    },

    {
        label: "DotProduct",
        dataTransfer: "DotProduct",
        tooltip: "Dot product vec4",
        
        getNewInstance: () => new DotProduct()
    },


    {
        label: "LinearInterpolate",
        dataTransfer: "LinearInterpolate",
        tooltip: "Linear interpolate vec3.",
        
        getNewInstance: () => new LinearInterpolate()
    },


    {
        label: "PerlinNoise",
        dataTransfer: "PerlinNoise",
        tooltip: "Perlin Noise.",
        
        getNewInstance: () => new PerlinNoise()
    },
    {
        label: "TextureCoords",
        dataTransfer: "TextureCoords",
        tooltip: "Fragment texture coordinates.",
        
        getNewInstance: () => new TextureCoords()
    },
    {
        label: "CameraCoords",
        dataTransfer: "CameraCoords",
        tooltip: "Camera coordinates.",
        
        getNewInstance: () => new CameraCoords()
    },
    {
        label: "AbsoluteWorldPosition",
        dataTransfer: "AbsoluteWorldPosition",
        tooltip: "Vertex coordinates.",
        
        getNewInstance: () => new AbsoluteWorldPosition()
    },
    {
        label: "NormalVector",
        dataTransfer: "NormalVector",
        tooltip: "Surface normal.",
        
        getNewInstance: () => new NormalVector()
    },
    {
        label: "ToTangentSpace",
        dataTransfer: "ToTangentSpace",
        tooltip: "To tangent space matrix.",
        
        getNewInstance: () => new ToTangentSpace()
    },
    {
        label: "ViewDirection",
        dataTransfer: "ViewDirection",
        tooltip: "View direction vector.",
        
        getNewInstance: () => new ViewDirection()
    },
    {
        label: "ParallaxOcclusionMapping",
        dataTransfer: "ParallaxOcclusionMapping",
        tooltip: "Parallax occlusion mapping.",
        
        getNewInstance: () => new ParallaxOcclusionMapping()
    },


    {
        label: "Add",
        dataTransfer: "Add",
        tooltip: "Adds two values (float, int, vec2, vec3, vec4)",
        
        getNewInstance: () => new Add()
    },
    {
        label: "TextureSample",
        dataTransfer: "TextureSample",
        tooltip: "Gets texture value (sampler 2d)",
        
        getNewInstance: () => new TextureSample()
    },

    {
        label: "Float",
        dataTransfer: "Float",
        tooltip: "Float uniform.",
        
        getNewInstance: () => new Float()
    },  {
        label: "Elapsed",
        dataTransfer: "ElapsedTime",
        tooltip: "Elapsed time.",
        
        getNewInstance: () => new ElapsedTime()
    }, {
        label: "Multiply",
        dataTransfer: "Multiply",
        tooltip: "Multiplies two values.",
        
        getNewInstance: () => new Multiply()
    },
    {
        label: "Sine",
        dataTransfer: "Sine",
        tooltip: "Sine of a value.",
        
        getNewInstance: () => new Sine()
    },    {
        label: "Divide",
        dataTransfer: "Divide",
        tooltip: "Divides two values.",
        
        getNewInstance: () => new Divide()
    },{
        label: "Min",
        dataTransfer: "Min",
        tooltip: "Min between two values.",
        
        getNewInstance: () => new Min()
    },{
        label: "Max",
        dataTransfer: "Max",
        tooltip: "Max between two values.",
        
        getNewInstance: () => new Max()
    },{
        label: "RGB",
        dataTransfer: "RGB",
        tooltip: "RGB color.",
        
        getNewInstance: () => new RGB()
    },
]