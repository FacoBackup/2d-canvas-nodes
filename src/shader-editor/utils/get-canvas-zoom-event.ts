import Canvas from "../lib/canvas/Canvas";

export default function getCanvasZoomEvent(canvasAPI:Canvas, canvas:HTMLCanvasElement):(this: HTMLCanvasElement, ev: WheelEvent) => void{
    return e => {
        e.preventDefault()
        let s = Canvas.scale
        // @ts-ignore
        if (e.wheelDelta > 0 && s < 3)
            s += s * .1
        // @ts-ignore
        else if (e.wheelDelta < 0 && s >= .5)
            s -= s * .1
        Canvas.scale = s
        canvas.style.backgroundSize = `${20 * s}px ${20 * s}px`
        canvasAPI.clear()
    }
}