<template>
  <img :src="require(`~/assets/images/${src}`)" alt="" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>
