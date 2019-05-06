// @ts-ignore
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/api", {
        "pathRewrite": {
            "^/api": "",
        },
        "target": "http://35.237.122.46:8000",
    }));
};
