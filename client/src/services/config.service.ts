export default class ConfigService {
    get() {
        const PATH_SRC = './src/';

        return {
            'PATH': {
                'COMPONENTS': PATH_SRC + 'components/',
                'PAGES': PATH_SRC + 'pages/',
                'ROOT': PATH_SRC,
                'SRC': PATH_SRC
            }
        };
    }
}
