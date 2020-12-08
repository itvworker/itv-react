module.exports = {
    presets: [
        [
            "@babel/preset-react"
            
        ],
       
        [   
            '@babel/preset-env',
            {
                modules: false,
                targets: {
                    chrome: '58',
                    ie: '11',
                },
            },
        ],
    ],
    plugins: [
        'babel-plugin-remove-vconsole',
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-react-jsx",
        '@babel/plugin-syntax-dynamic-import',
        "@babel/plugin-transform-runtime",
     
    ],
}
