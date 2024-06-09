import vega from 'vega'
import fs from 'fs'
import sharp from'sharp'
import svg2img from 'svg2img'
import converter from 'convert-svg-to-webp'

import spec from './sankey.vg.json'
import data from './sankeyMilitary.json'
import { useVega } from '@tools/vega.ts'

const vg = vega.parse(useVega('sankey', spec, data, 'en'))

const view = new vega.View(vg, { renderer: 'none' })
console.log(view.width(), view.height())
const svg = await view.toSVG()
fs.writeFileSync('public/vega.svg', svg)

sharp(Buffer.from(svg)).toFile('public/sharp.webp')

svg2img(svg, function(error, buffer) {
    fs.writeFileSync('public/svg2img.png', buffer)
})

console.log(converter)
fs.writeFileSync('public/convert-svg-to-webp.webp', await converter.convert(svg))

const canvas = view.toCanvas()
fs.writeFileSync('public/vega.png', canvas.createPNGStream())
