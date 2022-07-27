/*
    preact-router's missing hook
*/
import { Match } from 'preact-router/match'

let currentUrl

export function useUrl() {
    return currentUrl
}

export function UrlProvider({ children }) {
    return (
        <Match>
            {({ url }) => {
                currentUrl = url
                return children
            }}
        </Match>
    )
}