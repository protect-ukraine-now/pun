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

export function usePage() {
    let url = useUrl()
    return url.split('/')[2]
}
