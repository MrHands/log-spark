(async () => {
	const { exec } = require('child_process');
	const commander = require('commander');
	const fs = require('fs');
	const path = require('path');
	const util = require('util');

	const readdirPromise = util.promisify(fs.readdir);
	const statPromise = util.promisify(fs.stat);

	commander
		.version('1.0.0')
		.option('-t, --tests', 'run tests')
		.parse(process.argv);

	function RunCommand(command) {
		let result = 0;

		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`Failed to run "${command}": "${error.message}"`);
				result = -1;
				throw new Error(`Failed to run "${command}": "${error.message}"`);
				return;
			}
			if (stderr) {
				console.error(`Failed to run "${command}": "${stderr}"`);
				result = -1;
				throw new Error(`Failed to run "${command}": "${stderr}"`);
				return;
			}
			console.log(stdout);
		});

		return result;
	}

	const root = process.cwd();

	try {
		// library

		console.log('Compiling library...');

		RunCommand('npx tsc');

		// unit tests

		process.chdir(path.resolve(root, 'tests'));

		console.log('Compiling unit tests...');

		RunCommand('npx tsc');

		// integration tests

		console.log('Compiling integration tests...');

		let fileList = await readdirPromise(process.cwd(), null);

		const result = await Promise.all(fileList.map(async (file) => {
			const integrationDir = path.resolve(process.cwd(), file);
			const stat = await statPromise(integrationDir);
			
			if (stat && stat.isDirectory()) {
				return integrationDir;
			}
		}));
		const dirs = result.filter((it) => typeof it !== 'undefined');

		dirs.forEach(async (integrationDir) => {
			process.chdir(integrationDir);

			console.log(`  - ${path.basename(integrationDir)}`);

			RunCommand('npx tsc');
		});

		console.log('');
		console.log('DONE');
	} catch (error) {
		console.error(error.message);
	}
})();
