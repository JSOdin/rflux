var path = require('path');

module.exports = {
    context: path.resolve('src'),
    entry: './main.js',
    output: {
        path: path.resolve('dist/scripts'),
        publicPath: '/public/assets/js',
        filename: 'bundle.js'
    },
    watch:true,
    devServer :{
        contentBase: 'dist',
        inline:true
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                /*include: path.resolve('./src'),*/
                loader: "babel-loader"
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(ttf|eot|woff2|woff|svg)$/,
                loader:'url-loader?limit=10000' // url-loader requires file-loader if size is greater than limit
            }
        ]
    },
    resolve:{
        extensions: ['', '.js','.es6']   // for the commonJS "require" statements. empty string means you can require in full file names. other extensions mean you can exclude these within "require()"
    }
};