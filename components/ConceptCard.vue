<template>
  <div :id="concept.slug" class="shadow rounded-lg p-4 md:p-8 mb-6">
    <div
      class="flex rounded-lg py-1 items-center justify-between cursor-pointer"
      @click="show = !show"
    >
      <!-- Concept title -->
      <h2 class="text-2xl font-medium">
        {{ `${index + 1}. ${concept.title}` }}
      </h2>
      <span
        class="p-2 transform hover:scale-125 transition-transform duration-300"
        @click.stop="toggleCompleted()"
      >
        <svg
          class="fill-current h-5 w-auto "
          :class="{ 'text-blue-500': isDone, 'text-gray-400': !isDone }"
          viewBox="0 0 16 13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.8866 11.9102L1.08733 6.90428C1.05966 6.87541 1.03769 6.8411 1.0227 6.80331C1.00772 6.76551 1 6.72498 1 6.68405C1 6.64312 1.00772 6.60259 1.0227 6.5648C1.03769 6.527 1.05966 6.49269 1.08733 6.46383L2.29893 5.19188C2.41471 5.07047 2.60183 5.07047 2.71761 5.19188L5.87718 8.48539C5.99296 8.60679 6.18143 8.60538 6.2972 8.48397L13.2787 1.09229C13.3945 0.969473 13.5829 0.969473 13.7001 1.09088L14.913 2.36282C15.0288 2.48423 15.0288 2.68046 14.9143 2.80186L7.30821 10.85L7.30956 10.8514L6.30662 11.9088C6.19085 12.0302 6.00238 12.0302 5.8866 11.9102Z"
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </svg>
      </span>
    </div>
    <!-- Content -->
    <div class="overflow-hidden -mx-4 px-4">
      <transition name="animation">
        <div v-show="show" class="mt-4 text-gray-700">
          <nuxt-content class="markdown" :document="concept" />
          <!-- More on Google | Youtube -->
          <div v-if="concept.keywords" class="mt-4 text-xs text-right">
            <span class="text-gray-600">More on:</span>
            <a
              :href="`https://www.google.com/search?q=${concept.keywords}`"
              target="_blank"
              >Google</a
            >
            |
            <a
              :href="
                `http://www.youtube.com/results?search_query=${concept.keywords}`
              "
              target="_blank"
              >Youtube</a
            >
          </div>
        </div>
      </transition>
    </div>
    <!-- User unauthenticated modal -->
    <!-- @fix @todo BaseModal being rendered multiple times unecessaryly -->
    <BaseModal :show="showLoginModal" @close="showLoginModal = false">
      <template v-slot:header>
        Login to save your progress
      </template>
      <div>
        <p class="mb-6">
          Mark the concepts you have already covered as done and track your
          progress!
        </p>
        <nuxt-link to="/login"
          ><BaseButton class="mx-auto">Sign in/up</BaseButton></nuxt-link
        >
      </div></BaseModal
    >
  </div>
</template>

<script>
import BaseModal from '@/components/base/BaseModal.vue'

export default {
  components: {
    BaseModal
  },
  props: {
    concept: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true,
      showLoginModal: false
    }
  },
  computed: {
    isDone() {
      if (!this.$auth.loggedIn) {
        return false
      }
      return this.$store.getters.isConceptCompleted(this.concept.id)
    }
  },

  methods: {
    toggleCompleted() {
      if (!this.$auth.loggedIn) {
        this.showLoginModal = true
        return
      }
      if (!this.isDone) {
        this.$store.dispatch('markConceptAsDone', {
          conceptId: this.concept.id,
          roadmapSlug: this.$route.params.slug
        })
      } else {
        // unmark concept
        this.$store.dispatch('removeMarkedConcept', {
          conceptId: this.concept.id,
          roadmapSlug: this.$route.params.slug
        })
      }
    }
  }
}
</script>

<style>
@import '@/assets/css/markdown.css';

iframe {
  width: 100%;
  height: 56.25vw;
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
