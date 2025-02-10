"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static log(component, method, message, data) {
        console.log(`[${component}][${method}] ${message}`, data || '');
    }
    static error(component, method, error) {
        console.error(`[${component}][${method}] Error:`, error);
    }
}
exports.Logger = Logger;
