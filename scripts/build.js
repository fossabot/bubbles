const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const yargs = require('yargs/yargs');
const madge = require('madge');
const spawn = require('better-spawn');
const Logger = require('./utils/Logger');
const { getPackagesBuildOrder } = require('./utils/get-build-order');

const logger = new Logger('build-package');

async function main() {
  const argv = yargs(process.argv).argv;
  const toInclude = Object.keys(argv).filter((key) => !['_', '$0'].includes(key));
  const packages = (await getPackagesBuildOrder()).filter((package) => {
    if (toInclude.length === 0) {
      return true;
    }

    let found = false;
    toInclude.forEach((item) => {
      if (package.packageJson.name.indexOf(item) > 0) {
        found = true;
        return;
      }
    });

    return found;
  });

  for (const item of packages) {
    try {
      logger.info(`Building package ${chalk.cyan(item.packageJson.name)}`);

      const startTime = Date.now();

      spawn(`yarn madge:circular ${item.path + '/src'}`);

      await execa('yarn', ['workspace', item.packageJson.name, 'build']);

      logger.info(
        `Package ${chalk.cyan(item.packageJson.name)} built in ${chalk.green(
          `${((Date.now() - startTime) / 1000).toFixed(2)}s`
        )}`
      );
    } catch (err) {
      logger.error(`Failed to compile package: ${chalk.cyan(item.packageJson.name)}`);
      process.stdout.write(`${err.toString('minimal')}\n`);
      process.exit(1);
    }
  }
}

main();
