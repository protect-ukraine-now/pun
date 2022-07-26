const redirect = async () => {
    try {
        const resp = await fetch('https://ipapi.co/json/')
        const data = await resp.json()
        let cc = data.country_code.toLowerCase()
        try {
            if (Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase().startsWith("america/"))
                cc = 'us' // For VPN guys
        } catch (e) { }
        const dest = {
            us: '/home'
        }[cc] || '/report'
        location.replace(dest)
    } catch (e) { }
}

export default () => (
    <>
        <h1>Loading...</h1>
        <script>{redirect()}</script>
    </>
)
