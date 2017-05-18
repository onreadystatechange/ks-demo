module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react',
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },{ test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};