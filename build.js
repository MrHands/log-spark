(() => {
	// const fileSystem = require('fs');
	const commander = require('commander');
	const { exec } = require('child_process');

	commander
		.version('1.0.0')
		// .option( '-j, --javascript', 'compile and minify JavaScript files' )
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

	console.log('Compiling library...');

	if (RunCommand('npx tsc') !== 0) {
		console.error('Failed to compile Typescript.');
		return;
	}

	console.log('');
	console.log('DONE');
})();
