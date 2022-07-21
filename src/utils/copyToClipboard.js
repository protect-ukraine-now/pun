export default function copyToClipboard(selector) {
    const el = document.querySelector(selector)
    function listener(e) {
        e.clipboardData.setData("text/html", el?.innerHTML)
        e.clipboardData.setData("text/plain", el?.innerText)
        e.preventDefault()
    }
    document.addEventListener("copy", listener)
    document.execCommand("copy")
    document.removeEventListener("copy", listener)
}
