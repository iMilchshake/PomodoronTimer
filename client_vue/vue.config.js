module.exports = {
    publicPath: '/PomodoronTimer/',
    configureWebpack:{
    },
    devServer:{
        host: 'localhost',
        hot: true,
        port: 8080,
        proxy: {
            '^/PomodoronTimer/api/': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true
            }
        }
    }
}

