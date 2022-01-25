module.exports = {
  ssr: false,
  target: "static",
  head: {
    title: "myapp",
    meta: [{ charset: "utf-8" }],
  },
  loading: false,
  // css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: [
    
  ],
  buildModules: [
    // '@nuxtjs/router',
  ],
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios"],
};
