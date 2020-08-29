const path = require("path");

module.exports = {
  pages: {
    "opensource-components": {
      entry: "src/pages/opensource-components/main.ts",
      template: "public/index.html",
      filename: "opensource-components.html",
      title: "opensource-components"
    },
    index: "src/main.ts"
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss";`
      }
    }
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: {
                "primary-color": "#663399",
                "link-color": "#663399",
                "border-radius-base": "4px"
              }
            }
          }
        },
        {
          loader: "style-resources-loader",
          options: {
            patterns: [path.resolve(__dirname, "src/styles/imports.less")]
          }
        }
      ]
    });
    config.devServer = {
      proxy: {
        "/api": {
          target: `http://localhost:7004/api`,
          changeOrigin: true,
          pathRewrite: {
            "^/api": ""
          }
        }
      }
    };
  }
};
