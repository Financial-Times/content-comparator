export default class ConfigService {
    get() {
        const PATH_SRC = './client/src/',
            PATH_TARGET = './client/target/';

        return {
            'PATH': {
                'COMPONENTS': PATH_SRC + 'components/',
                'PAGES': PATH_SRC + 'pages/',
                'ROOT': PATH_SRC,
                'SRC': PATH_SRC,
                'TARGET': PATH_TARGET
            }
        };
    }
}
