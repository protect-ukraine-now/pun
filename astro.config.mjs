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
    }
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
  }), mdx()]
});