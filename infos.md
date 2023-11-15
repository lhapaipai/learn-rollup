```js
import { hello } from './foo'

export function greeter(name) {
  console.log(`${hello} ${name}`);
}

export function logger() {
  console.log('logger')
}

console.log(import.meta)
```

```ts
{
  code: "const hello = 'world'; ..."     // the generated JS code
  dynamicImports: string[],              // external modules imported dynamically by the chunk
                                         // s'il y a des import('other.js')
                                         // ['other-I6duqYAv.js']

  exports: string[],                     // ["greeter", "logger"]
  facadeModuleId: string | null,         // the id of a module that this chunk corresponds to
                                         // /path/to/main.js

  fileName: string,                      // the chunk file name
                                         // bundle.js

  implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
  imports: string[],             // external modules imported statically by the chunk
  importedBindings: {[imported: string]: string[]} // imported bindings per dependency

  isDynamicEntry: boolean,       // is this chunk a dynamic entry point
  
  isEntry: boolean,              // is this chunk a static entry point (true)
  isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
  map: string | null,            // sourcemaps if present
  modules: {                     // information about the modules in this chunk
    [id: string]: {
      renderedExports: string[]; // exported variable names that were included
      removedExports: string[];  // exported variable names that were removed
      renderedLength: number;    // the length of the remaining code in this module
      originalLength: number;    // the original length of the code in this module
      code: string | null;       // remaining code in this module
    };
  },
  name: string                   // the name of this chunk as used in naming patterns
  preliminaryFileName: string    // the preliminary file name of this chunk with hash placeholders
                                 // 'main.js'
                                 // dans le cas d'un fichier importé dynamiquement
                                 // 'other-!~{001}~.js'
  referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
  type: 'chunk',                 // signifies that this is a chunk
}
```