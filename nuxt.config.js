export default {
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: 'TechMastery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/global-component-loader.js', '@/plugins/axios'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://pwa.nuxtjs.org/setup.html
    ['@nuxtjs/pwa', { workbox: false }],
    // Doc: https://github.com/nuxt-community/analytics-module
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-159441322-3'
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-i18n',
    '@nuxt/content',
    '@nuxtjs/toast'
  ],
  /*
   ** Nuxt.js Toast
   ** See: https://github.com/nuxt-community/modules/tree/master/packages/toast#toast
   */
  toast: {
    position: 'bottom-left',
    duration: 4000,
    className: 'toast-alert',
    containerClass: 'toast-container'
  },

  /*
   ** Nuxt.js Auth
   */
  auth: {
    redirect: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `/auth/local`,
            method: 'post',
            propertyName: 'jwt'
          },
          logout: false,
          user: { url: '/users/me', method: 'get', propertyName: false }
        },
        autoFetchUser: false
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
      }
    }
  },
  /*
   ** Nuxt.js content
   */
  hooks: {
    'content:file:beforeInsert': (document) => {
      // I need each core in roadmap/index.json to be updated
      // with a list of concepts it has, so I can calculate the user progress
      // @todo: is there a better way to do this?

      const fs = require('fs')

      // @todo find more accurate way to target this hook only to a roadmap/index.json
      if (document.sections) {
        document.sections.forEach((section) => {
          section.cores.forEach((core) => {
            core.concepts = []
            const conceptFolder = core.to

            if (!conceptFolder) {
              return
            }

            const roadmap = document.dir

            // Check if it's a linked Core/Module
            const linkedFolder = JSON.parse(
              fs.readFileSync(`./content${roadmap}/${conceptFolder}/index.json`)
            ).linkedFolder

            let contentPath
            if (linkedFolder) {
              const locale = roadmap.split('/')[1]
              contentPath = `./content/${locale}/${linkedFolder}`
            } else {
              contentPath = `./content${roadmap}/${conceptFolder}`
            }

            const indexFile = JSON.parse(
              fs.readFileSync(`${contentPath}/index.json`)
            )

            indexFile.concepts.forEach((fileName) => {
              // Read/parse file
              const parseMD = require('parse-md').default
              const fileContent = fs.readFileSync(
                `${contentPath}/${fileName}.md`,
                'utf8'
              )
              const { metadata } = parseMD(fileContent)

              // Throw exception if hasn't got an id
              if (!metadata.id) {
                throw new Error(`Concept ${contentPath}/${fileName} has no id`)
              }
              core.concepts.push({ title: metadata.title, id: metadata.id })
            })
          })
        })
      }
    }
  },
  content: {
    // My custom configuration
    markdown: {
      prism: {
        theme: 'assets/css/prism-material-oceanic.css'
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:1337'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    middleware: ['theme']
  },
  // Allow dev server to accept connections from (external) hosts and ip addresses other than localhost
  server: {
    host: '0.0.0.0'
  },
  purgeCSS: {
    whitelist: ['hidden'],
    whitelistPatternsChildren: [/swiper/, /^token/, /^pre/, /^code/, /^toasted/]
  },
  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'br',
        iso: 'pt-BR'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  generate: {
    routes: ['/connect/google', '/connect/github']
  }
}
