<template>
  <header
    class="px-5 py-3 md:py-4  top-0 w-full z-10"
    :style="bgColor"
    :class="{
      'text-white': iconAction.dark,
      'text-gray-700': !iconAction.dark
    }"
  >
    <div class="flex justify-between max-w-screen-xl mx-auto items-center">
      <!-- HomeIcon / Action -->
      <div>
        <nuxt-link v-if="iconAction.to" :to="iconAction.to">
          <Logo
            class="h-6 md:h-7 w-auto transform hover:scale-110 duration-200 transition-transform"
          />
        </nuxt-link>
        <!-- BackArrow using $router.go(-1) -->
        <component
          :is="iconAction.icon"
          v-else
          class="h-5 w-auto cursor-pointer"
          @click.stop.native="$router.go(-1)"
        />
      </div>
      <!-- Text content -->
      <div v-if="$route.params.core" class="ml-4 flex-grow text-left text-lg">
        {{ roadmap.title }}
      </div>

      <div class="flex ">
        <div
          class="flex items-center"
          :class="{
            'text-white': iconAction.dark,
            'text-gray-500 ': !iconAction.dark
          }"
        >
          <a :href="$store.state.GITHUB_URL" target="_blank"
            ><GitHubIcon
              class="h-5 w-auto mr-5 transform hover:scale-125 duration-200 transition-transform"
          /></a>
          <a href="https://twitter.com/techmastery_io" target="_blank"
            ><TwitterIcon
              class="h-5 transform hover:scale-125 w-auto fill-current mr-5 duration-200 transition-transform"
          /></a>
        </div>
        <!-- Menu -->
        <div class="" @click.stop="toggleSideMenu">
          <header-menu
            class="h-8 w-auto cursor-pointer transform hover:scale-110 duration-200 transition-transform"
          />
        </div>
      </div>
    </div>
    <TheSideMenu :show="show" @close="show = false" />
  </header>
</template>

<script>
import HeaderMenu from '~/components/svg/HeaderMenu.vue'
import TheSideMenu from '@/components/TheSideMenu.vue'

export default {
  components: {
    HeaderMenu,
    TheSideMenu
  },
  data() {
    return {
      iconAction: {},
      show: false
    }
  },
  computed: {
    roadmap() {
      return this.$store.getters.getRodmapInfo(this.$route.params.slug)
    },
    bgColor() {
      let styleObj = {}
      if (this.$route.params.core || this.$route.params.slug) {
        styleObj = this.roadmap.bg_color
      }
      return styleObj
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(params, prevRouteParams) {
        // This logic controls the HomeIcon/ActionIcon in the Navbar
        if (params.core) {
          // CorePage, shows backArrow
          this.iconAction = {
            icon: 'ArrowIcon',
            dark: true
          }
          if (!prevRouteParams) {
            // No prevRouteParams, we assume there`s no route.go(-1) to go
            // then, we'll navigate back to the corresponding Roadmap page
            this.iconAction.to = this.localePath({
              name: 'paths-slug',
              params: { slug: params.slug }
            })
          } else {
            // With this property == null, we will render a different
            // element other than the nuxt-link> in order to use route.go(-1)
            this.iconAction.to = null
          }
        } else if (params.slug) {
          // RoadmapPage - actionIcon will point to home
          this.iconAction = {
            icon: 'LogoArrow',
            dark: true,
            to: this.localePath('/')
          }
        } else {
          // HomePage
          this.iconAction = {
            icon: 'Logo',
            dark: false,
            to: this.localePath('/')
          }
        }
      }
    }
  },
  methods: {
    toggleSideMenu() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped></style>
