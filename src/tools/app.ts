import { useLocation } from "./location"

export function useApp() {
    const { origin } = useLocation()
    const uat = origin.includes('uat') || origin.includes('ukraineaidtracker')
    const app = import.meta.env.VITE_APP_NAME ?? (uat ? 'uat' : 'pun')
    // console.log(app)
    return app
}