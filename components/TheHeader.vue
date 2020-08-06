<template>
  <header
    class="px-5 py-3 md:py-4  top-0 w-full z-10"
    :style="bgColor"
    :class="[$store.state.theme === 'dark' ? 'text-white' : 'text-gray-700']"
  >
    <div class="flex justify-between max-w-screen-xl mx-auto items-center">
      <!-- HomeIcon / Action -->
      <div>
        <!-- We're hiding when on ConceptPages instead of using v-if so it will prefetch the previous page on first access -->
        <nuxt-link
          :to="backBtnUrl ? backBtnUrl : '/'"
          :class="{ hidden: $route.params.core }"
        >
          <Logo
            class="h-6 md:h-7 w-auto transform hover:scale-110 duration-200 transition-transform"
          />
        </nuxt-link>
        <!-- BackButton -->
        <div
          v-if="$route.params.core"
          class="flex items-center text-left cursor-pointer text-lg"
          @click="backAction"
        >
          <ArrowIcon class="h-5 w-auto mr-3" />
          {{ roadmap.title }}
        </div>
      </div>

      <!-- Social Links -->
      <div class="flex ">
        <div
          class="flex items-center"
          :class="{ 'text-gray-500': $store.state.theme === 'light' }"
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
      show: false,
      backBtnUrl: null
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
        this.backBtnUrl = null
        if (!prevRouteParams) {
          // No prevRouteParams, we assume there`s no route.go(-1) to go
          // then, we'll navigate back to the corresponding Roadmap page
          this.backBtnUrl = this.localePath({
            name: 'paths-slug',
            params: { slug: params.slug }
          })
        }
      }
    }
  },
  methods: {
    toggleSideMenu() {
      this.show = !this.show
    },
    backAction() {
      if (!this.backBtnUrl) {
        this.$router.go(-1)
      } else {
        this.$router.push(this.backBtnUrl)
      }
    }
  }
}
</script>

<style scoped></style>
