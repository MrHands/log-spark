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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLoggingTransform = exports.$logWarn = exports.$logTrace = exports.$logInfo = exports.$logFatal = exports.$logError = void 0;
const typescript_1 = __importDefault(require("typescript"));
const log_severity_1 = require("./log-severity");
function CreateLoggingTransform(severity, levelPrefix, consoleMethod) {
    return (func, context, config) => {
        if (func.arguments.length < 2) {
            const source = func.getSourceFile();
            throw new Error(`(${source.fileName}) Not enough arguments for "${func.expression.getText()}" macro!`);
        }
        const { factory } = context;
        if (severity < config.logSeverityMinimum
            || severity > config.logSeverityMaximum) {
            return factory.createNotEmittedStatement(func);
        }
        const domain = func.arguments[0];
        const message = func.arguments[1];
        let textMessage = '';
        if (!typescript_1.default.isTemplateExpression(message)
            && !typescript_1.default.isCallExpression(message)) {
            textMessage = ` ${message.text}`;
        }
        const isException = (severity >= config.throwExceptionMinimum
            && severity <= config.throwExceptionMaximum);
        const prefix = isException ? '' : levelPrefix;
        const logArguments = [];
        if (typescript_1.default.isStringLiteral(domain)) {
            logArguments.push(factory.createStringLiteral(`${prefix}(${domain.text})${textMessage}`));
        }
        else {
            logArguments.push(factory.createBinaryExpression(factory.createBinaryExpression(factory.createStringLiteral(`${prefix}(`), factory.createToken(typescript_1.default.SyntaxKind.PlusToken), factory.createCallExpression(factory.createPropertyAccessExpression(domain, factory.createIdentifier('toString')), undefined, [])), factory.createToken(typescript_1.default.SyntaxKind.PlusToken), factory.createStringLiteral(`)${textMessage}`)));
        }
        if (textMessage === '') {
            logArguments.push(message);
        }
        if (isException) {
            const joinedMessage = logArguments.length > 1
                ? [factory.createCallExpression(factory.createPropertyAccessExpression(factory.createArrayLiteralExpression(logArguments), factory.createIdentifier('join')), undefined, [factory.createStringLiteral(' ')])] : logArguments;
            return factory.createImmediatelyInvokedArrowFunction([
                factory.createThrowStatement(factory.createNewExpression(factory.createIdentifier('Error'), undefined, joinedMessage)),
            ]);
        }
        return factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier('console'), factory.createIdentifier(consoleMethod)), undefined, logArguments);
    };
}
exports.CreateLoggingTransform = CreateLoggingTransform;
const $logTrace = CreateLoggingTransform(log_severity_1.ELogSeverity.Trace, '[TRACE] ', 'log');
exports.$logTrace = $logTrace;
const $logInfo = CreateLoggingTransform(log_severity_1.ELogSeverity.Info, '', 'log');
exports.$logInfo = $logInfo;
const $logWarn = CreateLoggingTransform(log_severity_1.ELogSeverity.Warn, '', 'warn');
exports.$logWarn = $logWarn;
const $logError = CreateLoggingTransform(log_severity_1.ELogSeverity.Error, '', 'error');
exports.$logError = $logError;
const $logFatal = CreateLoggingTransform(log_severity_1.ELogSeverity.Fatal, '[FATAL] ', 'error');
exports.$logFatal = $logFatal;
