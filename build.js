(async () => {
	const { spawn } = require('child_process');
	const commander = require('commander');
	const fs = require('fs');
	const path = require('path');
	const process = require('process');
	const util = require('util');

	const readdirPromise = util.promisify(fs.readdir);
	const statPromise = util.promisify(fs.stat);

	commander
		.version('1.0.0')
		.option('-t, --tests', 'run tests')
		.parse(process.argv);

	function RunCommand(...command) {
		let p = spawn(command[0], command.slice(1), { shell: true });
		return new Promise((resolve) => {
			p.stdout.on('data', (result) => {
				console.log(result.toString());
			});
			p.stderr.on('data', (result) => {
				console.error(`Failed to run "${command.join(' ')}": "${result}"`);
			});
			p.on('close', (code) => {
				if (code !== 0) {
					console.error(`"${command.join(' ')}" returned ${code}`);
				}

				resolve(code);
			});
		});
	}

	const root = process.cwd();

	try {
		// library

		console.log('Compiling library...');

		if (await RunCommand('npx', 'tsc') !== 0) {
			throw new Error('Failed to compile.');
		}

		// unit tests

		process.chdir(path.resolve(root, 'tests'));

		console.log('Compiling unit tests...');

		if (await RunCommand('npx', 'tsc') !== 0) {
			throw new Error('Failed to compile.');
		}

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

			if (await RunCommand('npx', 'tsc') !== 0) {
				throw new Error('Failed to compile.');
			}
		});

		console.log('');
		console.log('DONE');
	} catch (error) {
		console.error(error.message);
	}
})();
