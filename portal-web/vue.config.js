module.exports = {
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
        }
      ]
    });
    config.devServer = {
      proxy: {
        "/api": {
          target: `http://localhost:3001/api`,
          changeOrigin: true,
          pathRewrite: {
            "^/api": ""
          }
        }
      }
    };
  }
};
