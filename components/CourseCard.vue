<template>
  <div>
    <div class="bg-gray-100 rounded-lg text-gray-600">
      <ul v-if="courses.length">
        <li
          v-for="(course, index) in courses"
          :key="index"
          class="text-blue-500"
        >
          <a class="cursor-pointer" :href="course.url" target="_blank">
            <span><LiArrowIcon class="inline" /> </span>
            {{ course.title }}
            <span class="text-xs text-gray-500">- {{ course.created_by }}</span>
          </a>
        </li>
      </ul>
      <div v-else>
        <p>
          No related course available yet.
          <span class="text-blue-500">Suggest one here.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped></style>
