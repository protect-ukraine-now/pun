export default function (v) {
    const overlay = document.createElement("overlay");
    const elt = document.createElement("toast");
    elt.innerText = v;
    overlay.appendChild(elt);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.parentNode.removeChild(overlay), 2000);
    overlay.className = "toast";
}
