module.exports = {
    outputDir: "full/path/to/dist",
    // example: outputDir: 'C:\\Source\\Code\\Client\\packages\\clients\\dashboard\\dist',
    filenameHashing: false,
    runtimeCompiler: true,
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        output: {
            filename: 'jn-vue-app-template'
        },
        externals: {
            'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? {
                urls: {
                    apiBase: "https://id.jobbnorge.no/api/",
                    jobbadminBase: "https://jobbnorge.no/apps/jobbadmin/"
                },
                authCookie: {
                    domain: ".jobbnorge.no"
                }
            } : {
                    urls: {
                        apiBase: "http://api.trunk.com/api/",
                        jobbadminBase: "http://trunk.com/apps/jobbadmin/"
                    },
                    authCookie: {
                        domain: ".trunk.com"
                    }
                })
        }
    },
    chainWebpack: config => {
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@kazupon/vue-i18n-loader")
            .end();
    }
}