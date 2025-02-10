export class Logger {
    static log(component: string, method: string, message: string, data?: unknown): void {
        console.log(`[${component}][${method}] ${message}`, data || '');
    }

    static error(component: string, method: string, error: Error | unknown): void {
        console.error(`[${component}][${method}] Error:`, error);
    }
} 