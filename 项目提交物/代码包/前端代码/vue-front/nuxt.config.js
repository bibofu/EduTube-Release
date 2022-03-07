module.exports = {
  /*
  ** Headers of the page
  */
  // some nuxt config...
  server: {
    port: 9112,
    host: 'localhost'
  },
  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false }
  ],
  css: [
    'swiper/dist/css/swiper.css'
  ],
  head: {
    title: 'EduTube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // 设置请求转发
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true, // 需要的，不设置请求无法转发
  },
  proxy: {
    '/eduservice':
    {
      target: 'http://localhost:8001/eduservice', // api主机
      pathRewrite: { '^/eduservice': '/' },
      changeOrigin: true,
    },
    '/eduoss':
    {
      target: 'http://localhost:8002/eduoss', // api主机
      pathRewrite: { '^/eduoss': '/' },
      changeOrigin: true,
    },
    '/eduvod':
    {
      target: 'http://localhost:8003/eduvod', // 临时
      pathRewrite: { '^/eduvod': '/' },
      changeOrigin: true,
    },
    '/eduservice/banner':
    {
      target: 'http://localhost:8004/eduservice/banner',
      pathRewrite: { '^/eduservice/banner': '/' },
      changeOrigin: true,
    },
    '/cms':
    {
      target: 'http://localhost:8004/cms',
      pathRewrite: { '^/cms': '/' },
      changeOrigin: true,
    },
    '/edumsm':
    {
      target: 'http://localhost:8160/edumsm',
      pathRewrite: { '^/edumsm': '/' },
      changeOrigin: true,
    },
    '/ucenter':
    {
      target: 'http://localhost:8160/ucenter',
      pathRewrite: { '^/ucenter': '/' },
      changeOrigin: true,
    },
    '/eduorder':
    {
      target: 'http://localhost:8007/eduorder',
      pathRewrite: { '^/eduorder': '/' },
      changeOrigin: true,
    },
    '/api/ucenter':
    {
      target: 'http://localhost:8160/api/ucenter',
      pathRewrite: { '^/api/ucenter': '/' },
      changeOrigin: true,
    }

  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },

}

