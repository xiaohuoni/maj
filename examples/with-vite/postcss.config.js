module.exports = {
    plugins: [
        require("autoprefixer"),
        require("@alitajs/postcss-plugin-px2rem")({
            rootValue: 100,
            minPixelValue: 2,
            selectorDoubleRemList: [/^.adm-/, /^.ant-/, /^\:root/],
        }),
    ],
};
