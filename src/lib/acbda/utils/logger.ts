export class Logger {
    static log(component: string, method: string, message: string, data?: any) {
        console.log(`[${component}] ${method}: ${message}`, data ? data : '');
    }

    static error(component: string, method: string, error: any) {
        console.error(`[${component}] ${method} ERROR:`, error);
    }
} 