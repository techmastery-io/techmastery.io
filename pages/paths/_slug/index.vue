<template>
  <div class="relative bg-gray-100 core-container text-center">
    <PageHeader
      :title="roadmap.title"
      :summary="roadmap.description"
      :icon="roadmap.icon"
      :bg-color="roadmap.bg_color"
    />
    <!-- Under development alert -->
    <div
      v-if="roadmap.underDevelopment"
      class="relative bg-blue-500 text-white py-4"
    >
      <p>Under Development</p>
      <p class="text-sm">We're still enhancing and curating this roadmap</p>
    </div>

    <!-- Original view (Cards) -->
    <keep-alive>
      <div class="mx-5 flex flex-col items-center mt-16">
        <!-- @todo Extract CorePath? component/partial -->
        <div
          v-for="(section, index) in roadmap.sections"
          :key="index"
          class="relative w-full"
        >
          <roadmap-section
            :position="index"
            :range="roadmap.sections.length"
            :section="section"
            :color="roadmap.bg_color"
          >
            <core-card
              v-for="(core, idx) in section.cores"
              :key="idx"
              :core="core"
              :class="{
                'mb-16': !core.keep_with_next,
                'mb-3': core.keep_with_next
              }"
            />
          </roadmap-section>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import CoreCard from '@/components/CoreCard.vue'
import RoadmapSection from '@/components/RoadmapSection.vue'
import PageHeader from '@/components/PageHeader.vue'
export default {
  meta: { theme: 'dark' },
  components: {
    CoreCard,
    PageHeader,
    RoadmapSection
  },
  async asyncData({ params, app, store, payload, $content }) {
    const roadmap = await $content(`en/${params.slug}`, 'index').fetch()
    return { roadmap }
  }
}
</script>

<style scoped>
.section-title {
  position: relative;
  display: inline-block;
}
.section-title::before,
.section-title::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 50%;
  left: -120px;
  width: 90px; /* 100px line on either side */
  @apply border-b-2 border-gray-300;
}
.section-title::after {
  left: auto;
  right: -120px; /* make the "after" position on the right side of the h1 */
}

/* Path main line */
.core-container::before {
  content: '';
  text-align: center;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  position: absolute;
  border: solid 2px;
  height: calc(100% - 2rem);
  opacity: 0.5;
  @apply border-primary bg-primary;
}
</style>
