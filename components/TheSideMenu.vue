<template>
  <transition name="slide">
    <!-- I'm using v-if to avoid 'v-click-outside' from being triggered when this component is not visible on screen. -->
    <div
      v-if="show"
      v-click-outside="clickOutsideHandler"
      class="w-4/6 max-w-sm h-screen rounded-l-lg fixed top-0 right-0 bg-white shadow-xl p-5 md:px-8 text-gray-800"
    >
      <!-- Close button -->
      <div class="text-right mb-4" @click="$emit('close')">
        <span class="inline-block">
          <CloseIcon
            class="w-5 box-content h-auto cursor-pointer p-2 transform hover:scale-105 transition-transform duration-200"
          />
        </span>
      </div>
      <client-only>
        <div v-if="$auth.loggedIn">
          <p v-if="$auth.user.name" class="font-medium">
            {{ $auth.user.name }}
          </p>
          <p class="text-gray-600">{{ $auth.user.email }}</p>
          <p
            class="font-medium -mx-4 my-1 px-4 hover:bg-gray-100 py-3 cursor-pointer"
            @click="logout"
          >
            Sign out
          </p>
        </div>
        <div v-else>
          <nuxt-link to="/login" @click.native="$emit('close')"
            ><BaseButton class="mx-auto">Sign in/up</BaseButton></nuxt-link
          >
        </div>
      </client-only>
      <hr class="m-4" />

      <div class="nav-item">
        <GitHubIcon class="w-6 h-auto" />
        <span class="ml-3">Contribute</span>
      </div>
      <div class="nav-item">
        <TwitterIcon class="w-6 h-auto" />
        <span class="ml-3">Follow us</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import ClickOutside from 'vue-click-outside'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  directives: { ClickOutside },
  components: {
    BaseButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDE_MENU']),
    async logout() {
      await this.$auth.logout()
      this.$toast.show('Successfully logged out')
    },
    clickOutsideHandler() {
      if (this.show) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
.nav-item {
  @apply flex -mx-4  px-4 py-4 items-center cursor-pointer;
}
.nav-item:hover {
  @apply bg-gray-100;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 250ms, opacity 250ms;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
