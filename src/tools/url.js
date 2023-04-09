import { useRouter } from 'preact-router'

export function useUrl() {
    const [{ url }] = useRouter()
    return url
}

export function usePage() {
    const url = useUrl()
    return url.split('/')[2]
}
