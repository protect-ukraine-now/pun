import fs from 'fs'
import vl from 'vega-lite'

import sankey from './sankey.vg.json' assert { type: "json" }
import pda from './pda.vl.json' assert { type: "json" }

function loadVega(specs) {
    return Object.entries(specs).map(async ([key, spec]) => {
        if (!Array.isArray(spec.data)) spec.data = [spec.data]
        await Promise.all(spec.data.map(async ({ url }, i) => {
            if (!url) return
            let csv = await (await fetch(url)).text()
            delete spec.data[i].url
            spec.data[i].values = csv
        }))
        let json = 'export default\n' + JSON.stringify(spec, null, '\t')
        fs.writeFileSync(`src/data/${key}-w-data.vg.ts`, json)
    })
}

loadVega({
    sankey,
    pda: vl.compile(pda).spec,
})
