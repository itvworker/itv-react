module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        // 'postcss-url': {},
        'postcss-preset-env': {},
        cssnano: {},
        'postcss-u2u': [{
            unit: 'rem',
            divisor: 37.5,
            accuracy: 6,
            raw: 'pt',
        },
        {
            unit: 'rem',
            divisor: 37.5,
            accuracy: 6,
            raw: 'ipx',
        },
        {
            unit: 'vw',
            divisor: 3.75,
            accuracy: 6,
            raw: 'mm',
        }
    ],
        // "postcss-js": {},
        // autoprefixer: {},
    },
}
