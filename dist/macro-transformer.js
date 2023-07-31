"use strict";
/**
 * MIT License
 *
 * Copyright (c) 2023 Mr. Hands
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacroTransformer = void 0;
const conditional_transform_1 = require("./conditional-transform");
const config_1 = require("./config");
const logging_transform_1 = require("./logging-transform");
class MacroTransformer {
    constructor(context, pluginConfig, tsInstance) {
        var _a, _b, _c, _d, _e;
        this._config = new config_1.LogSparkConfig();
        this._macros = {
            $logTrace: logging_transform_1.$logTrace,
            $logInfo: logging_transform_1.$logInfo,
            $logWarn: logging_transform_1.$logWarn,
            $logError: logging_transform_1.$logError,
            $logFatal: logging_transform_1.$logFatal,
            $devOnly: conditional_transform_1.$devOnly,
            $prodOnly: conditional_transform_1.$prodOnly,
        };
        this._visitor = (node) => {
            if (node.pos >= 0 && this._tsInstance.isCallExpression(node)) {
                const func = node;
                const macro = this._macros[func.expression.getText()];
                if (typeof macro !== 'undefined') {
                    return macro(func, this._context, this._config);
                }
            }
            return this._tsInstance.visitEachChild(node, this._visitor, this._context);
        };
        this._context = context;
        this._pluginConfig = pluginConfig;
        this._tsInstance = tsInstance;
        this._config.logSeverityMinimum = (_a = pluginConfig.logSeverityMinimum) !== null && _a !== void 0 ? _a : this._config.logSeverityMinimum;
        this._config.logSeverityMaximum = (_b = pluginConfig.logSeverityMaximum) !== null && _b !== void 0 ? _b : this._config.logSeverityMaximum;
        this._config.throwExceptionMinimum = (_c = pluginConfig.throwExceptionMinimum) !== null && _c !== void 0 ? _c : this._config.throwExceptionMinimum;
        this._config.throwExceptionMaximum = (_d = pluginConfig.throwExceptionMaximum) !== null && _d !== void 0 ? _d : this._config.throwExceptionMaximum;
        this._config.isProduction = (_e = pluginConfig.isProduction) !== null && _e !== void 0 ? _e : this._config.isProduction;
    }
    run(node) {
        if (node.isDeclarationFile) {
            return node;
        }
        const statements = [];
        for (const s of node.statements) {
            const result = this._tsInstance.visitNode(s, this._visitor);
            if (result) {
                statements.push(...(Array.isArray(result) ? result : [result]));
            }
        }
        return this._tsInstance.factory.updateSourceFile(node, statements);
    }
}
exports.MacroTransformer = MacroTransformer;
