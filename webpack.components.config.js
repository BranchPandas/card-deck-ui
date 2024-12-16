const path = require('path');
const fs = require('fs');

module.exports = {
    entry: fs.readdirSync(path.resolve(__dirname, 'app/components')).reduce((acc, folder) => {
        // check if folder
        if (!fs.lstatSync(path.resolve(__dirname, 'app/components', folder)).isDirectory()) {
            return acc;
        }

        const file = fs.readdirSync(path.resolve(__dirname, 'app/components', folder)).find(file => file.endsWith('.js'));
        if (file && file.endsWith('.js')) {
            acc[file.replace('.js', '')] = path.resolve(__dirname, 'app/components', folder);
        }
        return acc;
    }, {}),
    mode: 'development',
    output: {
        filename: 'component-builds.js',
        path: path.resolve(__dirname, 'app/components')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
