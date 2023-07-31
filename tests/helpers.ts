type TConsoleMethod = (...value: string[]) => void;

function CaptureConsoleOutput(name: string, run: () => void) {
	let result = '';

	const dict = console as unknown as Record<string, TConsoleMethod>;
	const original = dict[name];
	// eslint-disable-next-line no-return-assign
	dict[name] = (...value: string[]) => result += value.join(' ');
	run();
	dict[name] = original;

	return result;
}

export { CaptureConsoleOutput };
