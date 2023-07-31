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
exports.ELogSeverity = void 0;
var ELogSeverity;
(function (ELogSeverity) {
    ELogSeverity[ELogSeverity["Disabled"] = -1] = "Disabled";
    ELogSeverity[ELogSeverity["Trace"] = 0] = "Trace";
    ELogSeverity[ELogSeverity["Info"] = 1] = "Info";
    ELogSeverity[ELogSeverity["Warn"] = 2] = "Warn";
    ELogSeverity[ELogSeverity["Error"] = 3] = "Error";
    ELogSeverity[ELogSeverity["Fatal"] = 4] = "Fatal";
    ELogSeverity[ELogSeverity["Maximum"] = 5] = "Maximum";
})(ELogSeverity || (exports.ELogSeverity = ELogSeverity = {}));
