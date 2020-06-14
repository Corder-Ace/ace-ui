"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (api) {
    if (api) {
        api.cache.never();
    }
    const { BABEL_MODULE, NODE_ENV } = process.env;
    const isTest = NODE_ENV === 'test';
    const useESModules = BABEL_MODULE !== 'commonjs' && !isTest;
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    loose: true,
                    modules: useESModules ? false : 'commonjs',
                },
            ],
            "@babel/preset-react",
            '@babel/preset-typescript',
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: false,
                    useESModules,
                },
            ],
            [
                'import',
                {
                    libraryName: 'sinon',
                    libraryDirectory: useESModules ? 'es' : 'lib',
                    style: true,
                },
                'sinon',
            ],
            '@babel/plugin-transform-object-assign',
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
        ],
    };
};
exports.default = module.exports;
