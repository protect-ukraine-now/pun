import { useLocation } from 'rakkasjs'

export function useApp() {
    let { current: { href } } = useLocation()
    href = href.toLocaleLowerCase()
    const uat = href.includes('uat') || href.includes('ukraineaidtracker')
    const app = import.meta.env.VITE_APP_NAME ?? (uat ? 'uat' : 'pun')
    console.log(app)
    return app
}