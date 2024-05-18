import { defineConfig } from 'astro/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import unocss from 'unocss/astro';
import { presetUno, transformerDirectives } from 'unocss';
import { presetDaisy } from 'unocss-preset-daisy';
import { presetIcons } from '@unocss/preset-icons';
import countries from './src/data/countries.json';
import mdx from "@astrojs/mdx";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'

const viteEnv = {};
Object.entries(process.env).forEach(([key, val]) => {
  if (key.startsWith(`VITE_`)) {
    console.log(key, val);
    viteEnv[`import.meta.env.${key}`] = `'${val}'`;
  }
});


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  vite: {
    define: viteEnv,
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {
        "@": '/src/'
      }
    },
    // alias: {
    //   'react': 'preact/compat',
    //   'react-dom': 'preact/compat',
    //   'react/jsx-runtime': 'preact/jsx-runtime'
    // }
		Please bring this invitation with you to the examination!
MAMMOGRAPHY
SCREENING
PROGRAM
Federal Joint
Committee
Invitation Code: DCW WRS NVF CR$
Central office at KV Westfalen- Lippe, PO Box 8846, 48047 Münster
Ms.
Raisa Kuzyk
Brüntrup- Wehrener Str 112
32825 Blomberg
Early detection of breast cancer:
	Central office at the Westphalia -
Lippe Association of Statutory Health Insurance
Physicians PO Box
8846 48047 Münster
Mon. - Thu.:
	Friday:
	8:00 a.m. - 4: 30 p.m
8:00 a.m. - 2:00 p.m
Appointment and information
Phone:

	E - mail:


	central - stelle@mswl.de

https://westfalen.mammotermin.de
	Münster, April 16, 2024
Offering an examination as part of the mammography screening program
Dear Ms.Kuzyk,
	We invited you to the breast cancer screening program some time ago and you have it
Appointment suggestion not taken up.In Germany, women between the ages of 50 and 69 have
the opportunity to take part in the breast cancer early detection program.The goal is through an early
Discovery to better treat breast cancer and reduce breast cancer mortality.
As the “central office”, we are tasked with informing you about this and inviting you to mammography
examinations.
We would be happy to suggest the following date for a mammography examination:
	Friday, May 17, 2024 at 1: 45 p.m
Lippisches Mammography Screening Center Detmold
Doctorweg
2 - 4(opposite the State Theater) in 32756 Detmold
	- Please be sure to bring this invitation with you to the screening appointment -
		If you would like another appointment, have questions or would like to cancel,
			you can use our online booking system at https://westfalen.mammotermin.de. You can
find the necessary invitation code at the top right of this page.We would be happy to
assist you personally on 0251 - 929 5000.
It is important: Participation in mammography screening is voluntary.Like all early detection
tests, mammography has advantages and disadvantages.To support you in your personal decision
for or against participation, the essential information about mammography screening has
been summarized in a brochure.This was attached to the previous invitation and can be found on
the
Internet at https://www.g-ba.de/sucheshilfe-mammographie.de Of course, we will
also send you the information brochure again.Please contact us at headquarters Job.
You have the right to personal information from a doctor in the mammography program.In this
conversation you can have the advantages and disadvantages explained in detail and any questions you
may have answered.There are usually no doctors involved in the mammography examination itself
present.
If you would like to have such a discussion, you must make your own appointment before
the examination.Please contact us as the “central office”.
You can also take part in the early detection examination without an explanation interview.In this
case, please bring the signed declaration overleaf to waive the information interview with you.
Further information on participation or cancellation can be found on the back of this letter.
Best regards

Petra Hibbeler
Head of Central Office WL
please turn  },
  markdown: {
    mode: 'mdx' // Explicitly set mode to 'mdx' for all markdown files
  },
  integrations: [preact({
    devtools: true
  }), unocss({
    // injectReset: true,
    transformers: [transformerDirectives()],
    presets: [presetUno(), presetDaisy({
      themes: ["light"]
    }), presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'text-bottom'
      }
    })],
    safelist: Object.keys(countries).map(c => `i-circle-flags-${c}`)
  }), mdx({
    include: '**/*.{md?}'
  }), markdoc(), keystatic()]
});