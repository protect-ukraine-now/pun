if (global.history) {
    let old = history.pushState
    history.pushState = function () {
        old.apply(this, arguments)
        scrollTo(0, 0)
    }
}
