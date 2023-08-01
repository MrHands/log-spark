(() => {
	const { exec } = require('child_process');
	const commander = require('commander');
	const fs = require('fs');
	const path = require('path');

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

	console.log('Compiling integration tests...');

	let succeeded = true;
	fs.readdir(process.cwd(), (_err, list) => {
		list.forEach((file) => {
			const integrationDir = path.resolve(process.cwd(), file);
			fs.stat(integrationDir, (_err, stat) => {
				if (stat && stat.isDirectory()) {
					process.chdir(integrationDir);

					if (RunCommand('npx tsc') !== 0) {
						succeeded = false;
						return;
					}
				}
			});
		});
	});

	if (!succeeded) {
		console.error('Failed to compile.');
		return;
	}

	console.log('');
	console.log('DONE');
})();
