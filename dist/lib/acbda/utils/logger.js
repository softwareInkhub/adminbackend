export class Logger {
    static log(component, method, message, data) {
        console.log(`[${component}] ${method}: ${message}`, data ? data : '');
    }
    static error(component, method, error) {
        console.error(`[${component}] ${method} ERROR:`, error);
    }
}
