const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "./scss/_colours.scss";
        @import "./scss/_global.scss";
        `,
      },
    },
  },
});
