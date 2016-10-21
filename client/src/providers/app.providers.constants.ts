export const APP_PROVIDERS_CONSTANTS = [
    {
        provide: 'API_ENDPOINT',
        useValue: window.localStorage.getItem('ApiEndpoint') || '/api/'
    }
];