module.exports = {
  ssr: false,
  target: "static",
  head: {
    title: "myapp",
    meta: [{ charset: "utf-8" }],
  },
  loading: false,
  // css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: [],
  buildModules: [
    // '@nuxtjs/router',
  ],
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    baseURL: "http://localhost:5000",
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            propertyName: "token",
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/auth/user", method: "get", propertyName: "user" },
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
    },
  },
};
