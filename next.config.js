require('dotenv').config();
const path = require('path');
// const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
    distDir: "dist",
    cssModules: false,
    webpack: (config, options) => {
        // config.plugins.push(new DuplicatePackageCheckerPlugin());
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
        config.plugins = config.plugins || [];
        config.plugins = [
            ...config.plugins,
        ];

        return config;
    }
};