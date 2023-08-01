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
				return;
			}
			if (stderr) {
				console.error(`Failed to run "${command}": "${stderr}"`);
				result = -1;
				return;
			}
			console.log(stdout);
		});

		return result;
	}

	const root = process.cwd();

	// library

	console.log('Compiling library...');

	if (RunCommand('npx tsc') !== 0) {
		console.error('Failed to compile.');
		return;
	}

	// unit tests

	process.chdir(path.resolve(root, 'tests'));

	console.log('Compiling unit tests...');

	if (RunCommand('npx tsc') !== 0) {
		console.error('Failed to compile.');
		return;
	}

	// integration tests

	async function CompileIntegrationTests() {
		console.log('Compiling integration tests...');

		let names = await readdirPromise(process.cwd(), null);
		console.log('Await!');
		console.log(names);

		let succeeded = true;
		let dirs;
		try {
			dirs = await readdirPromise(process.cwd(), null, (_err, list) => {
				const result = [];
	
				list.forEach(async (file) => {
					const integrationDir = path.resolve(process.cwd(), file);
					const stat = await statPromise(integrationDir);
	
					if (stat && stat.isDirectory()) {
						result.push(integrationDir);
						console.log(result);
					}
				});
			});
		} catch (err) {
			console.error(err);
		}
		console.log(dirs);

		/*
process.chdir(integrationDir);

					console.log(`Compiling ${path.basename(integrationDir)}...`);

					if (RunCommand('npx tsc') !== 0) {
						succeeded = false;
						return;
					}
		 */
	
		console.log('Await!');

		return succeeded;
	}

	CompileIntegrationTests().then((succeeded) => {
		if (!succeeded) {
			console.error('Failed to compile.');
			return;
		}
	
		console.log('');
		console.log('DONE');
	});
})();
