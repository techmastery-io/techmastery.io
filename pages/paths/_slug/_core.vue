<template>
  <div class="bg-gray-100  mx-auto w-full">
    <PageHeader
      :bg-color="roadmap.bg_color"
      :title="core.title"
      :summary="core.summary"
    />
    <!-- TOC - Table of Content @todo extract to its own component -->
    <div class="flex xl:flex-row flex-col my-6 xl:px-8">
      <div
        class="block xl:w-1/4 w-full pl-4 md:pl-8 xl:pl-0 md:max-w-3xl mx-auto mb-10 xl:sticky xl:top-2 xl:self-start"
      >
        <h2>Concepts</h2>
        <ol class="list-decimal pl-4 text-gray-600">
          <li
            v-for="(concept, index) in core.concepts"
            :key="index"
            class="mb-2 md:mb-1 text-lg "
          >
            <a
              :href="`#${concept}`"
              class="hover:text-primary hover:font-medium"
              @click.prevent="scrollTo(concept)"
              >{{ findConceptBySlug(concept).title }}</a
            >
          </li>
        </ol>
      </div>
      <!-- Content container -->
      <main class="xl:w-2/4 w-full md:max-w-3xl mx-auto">
        <div v-if="core.concepts" class="mx-auto">
          <ConceptCard
            v-for="(concept, index) in core.concepts"
            :key="index"
            :index="index"
            :concept="findConceptBySlug(concept)"
            class="mb-4 bg-white"
          />
        </div>
        <div v-else class="text-center">
          <p>
            No concepts available yet.
            <span class="text-blue-500">Suggest one here.</span>
          </p>
        </div>
      </main>
      <aside
        class="w-full pl-4 md:pl-8 md:max-w-3xl mx-auto xl:w-1/4 xl:pl-8 xl:sticky xl:top-2 xl:self-start"
      >
        <h2>Related Courses</h2>
        <CourseCard :courses="core.courses" />
      </aside>
    </div>
  </div>
</template>

<script>
import ConceptCard from '@/components/ConceptCard'
import CourseCard from '@/components/CourseCard'
import PageHeader from '@/components/PageHeader.vue'

export default {
  meta: { theme: 'dark' },
  components: {
    ConceptCard,
    CourseCard,
    PageHeader
  },

  async asyncData({ params, app, store, payload, $content }) {
    // @todo: do we still get a payload in the current Nuxt version?
    // if (payload) return { roadmap: payload }

    const roadmap = await $content('en', params.slug, 'index')
      .only(['title', 'bg_color'])
      .fetch()

    let folderContent = await $content('en', params.slug, params.core).fetch()
    let coreInfo = folderContent.find((obj) => obj.slug === 'index')

    // Check if this Module is linked with a different path/folder
    if (coreInfo.linkedFolder) {
      folderContent = await $content(`en/${coreInfo.linkedFolder}`).fetch()
      coreInfo = folderContent.find((obj) => obj.slug === 'index')
    }

    return {
      core: coreInfo,
      concepts: folderContent,
      roadmap
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.hash.length) {
        this.scrollTo(this.$route.hash)
      }
    })
  },
  methods: {
    findConceptBySlug(slug) {
      return this.concepts.find((concept) => concept.slug === slug)
    },
    scrollTo(id) {
      // method based on Nuxt.org website: https://github.com/nuxt/nuxtjs.org/blob/master/components/TheAsideNav.vue#L117
      if (this._scrolling) {
        return
      }
      this._scrolling = true
      // if (this.$store.state.visibleAffix) {
      //   this.toggle()
      // }
      if (id !== this.$route.hash) {
        this.$router.replace(this.$route.fullPath.split('#')[0] + `#${id}`)
      }
      this.$nextTick(() => {
        const el = document.getElementById(id)
        if (!el) {
          this._scrolling = false
          return
        }
        const to = el.offsetTop - (window.outerWidth < 1024 ? 90 : 120)
        const doc = document.documentElement
        let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        const diff = (to > top ? to - top : top - to) / 25
        let i = 0
        window.clearInterval(this.setInter)
        this.setInter = window.setInterval(() => {
          top = to > top ? top + diff : top - diff
          window.scrollTo(0, top)
          i++
          if (i === 25) {
            this._scrolling = false
            window.clearInterval(this.setInter)
          }
        }, 10)
      })
    }
  }
}
</script>

<style scoped>
h2 {
  @apply text-xl mb-3 font-medium uppercase;
}
</style>
