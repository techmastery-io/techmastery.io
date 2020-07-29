<template>
  <div>
    <header
      class="flex max-w-xl mx-auto items-center mb-8 md:text-lg p-3 shadow  cursor-pointer transition-all ease-out duration-300"
      :class="{ 'rounded-t-lg': show, 'rounded-lg': !show }"
      :style="color"
      @click="show = !show"
    >
      <!-- Postion Dots -->
      <div class="mr-2 flex">
        <span
          v-for="index in range"
          :key="index"
          class="border border-white w-3 h-3 rounded-full inline-block mr-1"
          :class="{ 'bg-white': index <= position + 1 }"
        ></span>
      </div>
      <!-- Content -->
      <div class="flex-grow text-left text-white uppercase">
        <h2 class="font-semibold">{{ section.title }}</h2>
      </div>
      <!-- Action/fold button -->
      <div class="cursor-pointer  p-2">
        <svg
          :class="{ 'arrow-closed': !show, 'arrow-opened': show }"
          class="w-3 h-auto fill-current text-white"
          viewBox="0 0 10 7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 7L0 -4.37114e-07L10 0L5 7Z" />
        </svg>
      </div>
    </header>
    <div class="overflow-hidden -mx-4 lg:mx-0 py-1">
      <transition name="animation">
        <div v-show="show" class="mx-4 max-w-xl sm:mx-auto">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      default() {}
    },
    position: {
      type: Number,
      default: 0
    },
    range: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.arrow-opened {
  transition: transform 175ms;
  transform: rotate(0deg);
}

.arrow-closed {
  transform: rotate(90deg);
  transition: transform 175ms;
}

.animation-enter-active,
.animation-leave-active {
  transition: opacity 200ms ease-in, transform 200ms ease-out;
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
  transform: translateY(-500px);
}
</style>
