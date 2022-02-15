const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { buildPackage, BuildOptions } = require('./utils/build-package');
const { buildAllPackages } = require('./utils/build-all-packages');

const { argv } = yargs(hideBin(process.argv))
  .option('all', {
    type: 'boolean',
    default: false,
    description: 'Build all packages.',
  })
  .option('project', {
    type: 'string',
    description: 'Specify package should be bundled.',
  })
  .option('analyze', {
    type: 'boolean',
    default: false,
    description: 'Generate analyze files.',
  })
  .option('sourcemap', {
    type: 'boolean',
    default: true,
    description: 'Generate sourcemap.',
  })
  .option('formats', {
    type: 'string',
    array: true,
    choices: ['es', 'cjs'],
    default: ['es', 'cjs'],
    description: "Specify module code generation: 'es', 'cjs'.",
  })
  .example([
    ['$0 all --formats umd cjs', 'Building only umd and cjs packages.'],
    ['$0 @bubbles-ui/leemons --analyze', 'Building leemons package and generating analyzing file.'],
  ]);

(async () => {
  if (argv._[0] === 'all' || argv.all) {
    await buildAllPackages(argv);
  } else if (argv._[0] || argv.project) {
    await buildPackage(argv._[0] || argv.project, argv);
  }
})();
