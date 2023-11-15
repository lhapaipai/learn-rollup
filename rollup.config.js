import { defineConfig } from "rollup";

const POLYFILL_ID = '\0polyfill';
const PROXY_SUFFIX = '?inject-polyfill-proxy';

export default defineConfig({
  input: './src/main.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  makeAbsoluteExternalsRelative: false,
  plugins: [{
    name: 'my-example',
    async resolveId(source, importer, options) {
      if (source === 'my-dependency') {

				return {
          id: 'my-dependency',
          external: true,
          attributes: {
            type: 'json'
          }
        };
			}


      return null;
    },
    shouldTransformCachedModule(options) {
      return false
    },
    load(id) {
      return null;
    },
    transform(code, id) {
      return null
    },
    moduleParsed(moduleInfo) {
      const foo = null;
    }
  }]
})