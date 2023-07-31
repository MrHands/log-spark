/* eslint-disable no-console */

function CaptureConsoleLog(run: () => void) {
	let result = '';

	const original = console.log;
	// eslint-disable-next-line no-return-assign
	console.log = (...value: string[]) => result += value.join(' ');
	run();
	console.log = original;

	return result;
}

function CaptureConsoleError(run: () => void) {
	let result = '';

	const original = console.error;
	// eslint-disable-next-line no-return-assign
	console.error = (...value: string[]) => result += value.join(' ');
	run();
	console.error = original;

	return result;
}

export {
	CaptureConsoleError,
	CaptureConsoleLog,
};
