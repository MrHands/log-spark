import path from 'path';

import {
	DevOnlyTransform,
	LoggingTransform,
	ProdOnlyTransform,
} from '../source';
import tsconfig from '../tsconfig.json';

export default (env: NodeJS.ProcessEnv) => {
	const targetPath = path.resolve(__dirname, '../build/tests');

	const nodeEnv =		(env.production != null ? 'production' : null)
		?? env.NODE_ENV
		?? 'development';

	const isProduction = nodeEnv === 'production';
	const isDevelopment = !isProduction;

	const compilerOptions = Object.assign(tsconfig.compilerOptions, {
		outDir: targetPath,
		declaration: false,
	});

	return {
		entry: {
			'log-info': path.resolve(__dirname, 'log-info/log-info.test.ts'),
		},

		module: {
			rules: [
				// compile typescript
				{
					test: /\.ts$/u,
					// include: [path.resolve(__dirname, 'js')],
					use: [
						{
							loader: require.resolve('ts-loader'),
							options: {
								compilerOptions,
								getCustomTransformers: () => ({
									before: [
										DevOnlyTransform(isDevelopment),
										ProdOnlyTransform(isProduction),
										LoggingTransform,
									],
								}),
							},
						},
					],
				},
			],
		},

		output: {
			chunkFormat: 'commonjs',
			chunkLoading: 'require',
			environment: {
				module: false,
			},
			path: targetPath,
			filename: 'js/[name].bundle.js',
			sourceMapFilename: '[file].map',
		},

		target: 'es2020',
	};
};
