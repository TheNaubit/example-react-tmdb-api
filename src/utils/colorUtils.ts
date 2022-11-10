import { RGBA } from "@types";

function clampRGB(unclampedValue: number) {
    if (unclampedValue < 0) return 0
    if (unclampedValue > 255) return 255

    return unclampedValue
}

function clampAlpha(unclampedValue: number) {
    if (unclampedValue < 0) return 0
    if (unclampedValue > 1) return 1

    return unclampedValue
}

export function rgbStringToStruct(color: string) {
    const colorArr = color.slice(
        color.indexOf("(") + 1,
        color.indexOf(")")
    ).split(",");

    return {
        red: clampRGB(parseInt(colorArr[0] || "")),
        green: clampRGB(parseInt(colorArr[1] || "")),
        blue: clampRGB(parseInt(colorArr[2] || "")),
        alpha: clampAlpha(parseFloat(colorArr[3] || ""))
    } as RGBA
}

export function rgbStructToString(color:RGBA) {
    return `rgba(${color.red},${color.green},${color.blue},${color.alpha})`
}

export function mergeColors(baseColor:RGBA, colorToMerge:RGBA, mergePath: {
    mergeRed?: boolean,
    mergeGreen?: boolean,
    mergeBlue?: boolean,
    mergeAlpha?: boolean
}) {
    return {
        red: mergePath.mergeRed ? colorToMerge.red : baseColor.red,
        green: mergePath.mergeGreen ? colorToMerge.green : baseColor.green,
        blue: mergePath.mergeBlue ? colorToMerge.blue : baseColor.blue,
        alpha: mergePath.mergeAlpha ? colorToMerge.alpha : baseColor.alpha
    } as RGBA
}