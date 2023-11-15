import { rollup } from "rollup";

const inputOptions = {
  input: 'src/main.js'
}
const outputOptionsList = [
  {
    dir: './dist-builder',
    // file: 'dist-builder/bundle.js',
    format: 'es'
  }
]

build();

async function build() {
  let bundle;
  let buildFailed = false;

  try {
    bundle = await rollup(inputOptions);
    console.log(bundle.watchFiles);
    await generateOutputs(bundle)
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionsList) {
    const { output } = await bundle.generate(outputOptions);

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        console.log('Asset', chunkOrAsset);
      } else {
        console.log('Chunk', chunkOrAsset.modules);
      }
    }
  }
}