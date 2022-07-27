/*
    preact-router's missing "hook"
*/
let currentUrl

export function useUrl() {
    return currentUrl
}

export function setUrl(url) {
    currentUrl = url
}
