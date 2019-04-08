module.exports = {
    runtimeCompiler: true,

    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Index Page",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        },
        grid: {
            entry: "src/main-grid",
            template: "public/grid.html",
            filename: "grid.html",
            title: "Grid Page",
            chunks: ["chunk-vendors", "chunk-common", "grid"]
        }
    },
    baseUrl: "",
    outputDir: undefined,
    assetsDir: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
};
