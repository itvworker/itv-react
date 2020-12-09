module.exports = {
    proxy: { //代理
        '/mas/v5/': {
            target: 'https://mapsalessit.midea.com',
            changeOrigin: true,
            pathRewrite: {
                '^mas/v5/': 'https://mapsalessit.midea.com'
            }
        },
        '/mas-api/restful': {
            target: 'https://mapnew.midea.com',
            changeOrigin: true,
            pathRewrite: {
                '^mas-api/restful': 'https://mapnew.midea.com'
            }
        }
    }
}
