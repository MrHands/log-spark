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
exports.LogSparkPluginConfig = exports.LogSparkConfig = void 0;
const log_severity_1 = require("./log-severity");
class LogSparkPluginConfig {
}
exports.LogSparkPluginConfig = LogSparkPluginConfig;
class LogSparkConfig {
    constructor() {
        this.logSeverityMinimum = log_severity_1.ELogSeverity.Trace;
        this.logSeverityMaximum = log_severity_1.ELogSeverity.Fatal;
        this.throwExceptionMinimum = log_severity_1.ELogSeverity.Fatal;
        this.throwExceptionMaximum = log_severity_1.ELogSeverity.Fatal;
        this.isProduction = false;
    }
}
exports.LogSparkConfig = LogSparkConfig;
