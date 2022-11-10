import { LoaderState } from "@types"

export function trimStringToLength({text, maxLength, addEllipsis = true}: {text: string, maxLength: number, addEllipsis?: boolean}) {
    const _trimmedText = text.substring(0, maxLength)

    return `${_trimmedText}${text.length > maxLength && addEllipsis ? "..." : ""}`
}

export function convertCSSToLoaderState(value:string) {
    switch(value) {
        case "block":
            return LoaderState.Loading
        case "none":
        default:
            return LoaderState.Loading
    }
}