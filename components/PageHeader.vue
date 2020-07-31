<template functional>
  <header
    class="px-5 relative pt-8 pb-16 text-white text-center overflow-hidden"
    :style="props.bgColor"
  >
    <div class="max-w-lg flex justify-center items-center mx-auto">
      <div v-if="props.icon">
        <component :is="props.icon" class="mr-5 h-12 md:h-20 w-auto" />
      </div>
      <div>
        <h1 class="text-2xl lg:text-3xl">
          {{ props.title }}
        </h1>
        <p class="max-w-md text-lg mt-2">{{ props.summary }}</p>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    }
  }
}
</script>
