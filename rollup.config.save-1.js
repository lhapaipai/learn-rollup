import { defineConfig } from "rollup";

const POLYFILL_ID = '\0polyfill';
const PROXY_SUFFIX = '?inject-polyfill-proxy';

export default defineConfig({
  input: './src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [{
    name: 'my-example',
    resolveId(source, importer, options) {
      if (source === 'my-dependency') {
				return { id: 'my-dependency-develop', external: true };
			}
      if (source === 'virtual-module') {
        return '\0virtual-module';
      } else if (source === "external") {
        return {
          id: "external",
          external: true
        }
      }
      return null;
    },
    load(id) {
      if (id === '\0virtual-module') {
        return 'export default "This is virtual !"';
      }
      return null;
    }
  }, {
    name: 'inject-polyfill',
    async resolveId(source, importer, options) {
      if (source === POLYFILL_ID) {
        return {
          id: POLYFILL_ID,
          moduleSideEffects: true
        }
      }
      if (options.isEntry) {
        const resolution = await this.resolve(source, importer, options);
        if (!resolution || resolution.external) {
          return resolution;
        }

        const moduleInfo = await this.load(resolution);

        moduleInfo.moduleSideEffects = true;

        return `${resolution.id}${PROXY_SUFFIX}`
      }
    },
    load(id) {
      if (id === POLYFILL_ID) {
        return "console.log('polyfill');";
      }
      if (id.endsWith(PROXY_SUFFIX)) {
        const entryId = id.slice(0, -PROXY_SUFFIX.length)
        const { hasDefaultExport } = this.getModuleInfo(entryId);
        let code =
					`import ${JSON.stringify(POLYFILL_ID)};` +
					`export * from ${JSON.stringify(entryId)};`;

        if (hasDefaultExport) {
          code += `export { default } from ${JSON.stringify(entryId)}`;
        }
        return code;
      }
      return null;
    }
  }
  ]
})