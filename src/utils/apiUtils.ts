import urlcat from "urlcat"

export function getImageFullPath(imageRelativePath:string) {
    return urlcat("https://image.tmdb.org/t/p/w500/:relativePath", {relativePath: imageRelativePath})
}

export function getURLWithoutCORS(url:string) {
    return `https://corsproxy.io/?${url}`
}