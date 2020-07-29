<template>
  <div class="max-w-screen-sm mx-auto text-left">
    <div v-for="(section, index) in roadmap.sections" :key="index" class="mb-4">
      <h3 class="text-lg font-semibold">{{ section.title }}</h3>
      <details v-for="(core, index1) in section.cores" :key="index1" open>
        <summary class="ml-4">
          {{ core.title }}
        </summary>
        <ul class="ml-8">
          <li v-for="(concept, index2) in core.concepts" :key="index2">
            {{ concept }}
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roadmap: {
      type: Object,
      default() {}
    }
  },
  async created() {
    // get concepts for each core
    // this.roadmap.cores.forEach(core => {
    //     const folderContent = await $content(
    //     `en/${params.slug}/${core}`
    //   ).fetch()
    //   const core = folderContent.find((obj) => obj.slug === 'index')
    //   return {
    //     core,
    //     concepts: folderContent,
    //     roadmap: store.getters.getRodmapInfo(params.slug)
    //   }
    // });
  }
}
</script>

<style scoped></style>
