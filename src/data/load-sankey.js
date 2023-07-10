import fs from 'fs'

import sankey from './sankey.vg.json' assert { type: "json" }

async function loadVega(spec) {
    let data = spec.data.map(async ({ url }, i) => {
        if (!url) return
        let csv = await (await fetch(url)).text()
        delete spec.data[i].url
        spec.data[i].values = csv
    })
    await Promise.all(data)
    let json = 'export default\n' + JSON.stringify(spec, null, '\t')
    fs.writeFileSync(`src/data/sankey-w-data.vg.ts`, json)
}

loadVega(sankey)
