import Canvas from "../lib/canvas/Canvas";

export default function drawIO(ctx, asOutput, x, y, w, index, label, enabled) {
    const LABEL_OFFSET = 13
    const H_OFFSET = 20
    const H = 15
    const Y = y + H * (index + 1) + H_OFFSET
    const X = !asOutput ? x + 2.5 : x + w - 15
    const R = 4
    const YA = Y - R

    ctx.fillStyle = Canvas.backgroundColor
    ctx.strokeStyle = Canvas.borderColor
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(X + LABEL_OFFSET / 2, YA, R, 0, Math.PI * 2)
    ctx.fill()
    if (enabled)
        ctx.stroke()
    ctx.fillStyle = enabled ? "#f0f0f0" : "#afafaf"
    if (asOutput)
        ctx.fillText(label, X - label.length * Canvas.fontSize + LABEL_OFFSET, Y);
    else
        ctx.fillText(label, X + LABEL_OFFSET, Y);
    ctx.closePath()
}