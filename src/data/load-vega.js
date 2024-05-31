import fs from 'fs'
import vl from 'vega-lite'

import pda from './pda.vl.json' with { type: "json" }
import loses from './loses.vl.json' with { type: "json" }

export const config = {
    sankey24: {
        entries: 'https://docs.google.com/spreadsheets/d/1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs/export?format=csv&id=1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs&gid=238011614',
        connections: 'https://docs.google.com/spreadsheets/d/1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs/export?format=csv&id=1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs&gid=1826636675',
    },
    sankey: {
        entries: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7ok1ZDyU1Lz37NIZAMrSv7u_xL4SjWQcXIj5RWj4qzsgbIiU-wqmEK8kwtsMeVt_qTuEVIPgRiLiE/pub?gid=1885277555&single=true&output=csv',
        connections: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7ok1ZDyU1Lz37NIZAMrSv7u_xL4SjWQcXIj5RWj4qzsgbIiU-wqmEK8kwtsMeVt_qTuEVIPgRiLiE/pub?gid=1480746214&single=true&output=csv',
    },
    sankeyMilitary: {
        entries: 'https://docs.google.com/spreadsheets/d/1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs/export?format=csv&id=1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs&gid=1809221022',
        connections: 'https://docs.google.com/spreadsheets/d/1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs/export?format=csv&id=1Q9aLVoSZ9vTKH0VLnMpFRiY6h0kV6Rcb16R4lP0rUFs&gid=977981274',
    },
}

function loadVega(what = config) {
    return Object.entries(what).map(async ([file, sources]) => {
        await Promise.all(Object.entries(sources).map(async ([src, url]) => {
            let csv = await (await fetch(url)).text()
            sources[src] = csv
        }))
        let json = /*'export default\n' +*/ JSON.stringify(sources, null, '\t')
        fs.writeFileSync(`src/data/${file}.json`, json)
    })
}

loadVega()

pda.data.values = await (await fetch(pda.data.url)).text()
delete pda.data.url
let json = JSON.stringify(vl.compile(pda).spec, null, '\t')
fs.writeFileSync(`src/data/pda-w-data.vg.json`, json)

loses.data.values = await (await fetch(loses.data.url)).text()
delete loses.data.url
json = JSON.stringify(vl.compile(loses).spec, null, '\t')
fs.writeFileSync(`src/data/loses-w-data.vg.json`, json)
