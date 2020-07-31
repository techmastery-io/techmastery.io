<template>
  <div class="w-full" :class="{ 'cursor-default ': !core.to }">
    <nuxt-link
      class=" py-4 bg-white shadow  rounded-lg mx-auto block"
      :class="{ 'hover:shadow-lg transition-shadow duration-150': core.to }"
      :to="getTargeURL"
    >
      <div
        class="pl-6 flex pr-3 relative center-items justify-between md:py-2"
        style="min-height: 4rem;"
      >
        <client-only>
          <div
            v-if="progress"
            class="progress-text text-sm text-gray-400 mr-3"
            :class="{ 'text-blue-500': progress == 100 }"
          >
            {{ progress }}%
          </div>
        </client-only>
        <!-- Content -->
        <div class="text-left w-full flex flex-col justify-center">
          <h3
            class="text-base mb-1 font-medium"
            :class="{ 'text-center': isDecisionComponent }"
          >
            {{ core.title }}
            <span v-if="!core.to" class="text-blue-500">(available soon)</span>
          </h3>
          <p
            class="text-sm text-gray-600"
            :class="{ 'text-center': isDecisionComponent }"
          >
            {{ core.concepts.map((concept) => concept.title).join(' · ') }}
          </p>
          <ul v-if="$route.query.details" class="text-gray-600 mt-4">
            <li v-for="(concept, idx) in core.concepts" :key="idx">
              <span><LiArrowIcon class="inline" /> </span> {{ concept.title }}
            </li>
          </ul>
        </div>
        <!-- Arrow -->
        <div v-if="core.to" class="flex ml-3 items-center">
          <ArrowIcon
            class="transform rotate-180 text-gray-500 w-5 h-5 border-white"
          />
        </div>
      </div>
      <!-- Icons -->
      <div v-if="core.related_icons" class="flex justify-end pr-3">
        <component
          :is="icon"
          v-for="(icon, index) in core.related_icons"
          :key="index"
          class="h-6 w-auto ml-2"
          style="max-width: 2rem;"
        />
      </div>
    </nuxt-link>

    <!-- Decision Panel (slider) -->
    <div
      v-if="isDecisionComponent"
      class="md:-mx-64 carrousel flex mt-6 overflow-x-scroll md:overflow-x-auto"
    >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="(roadmapSlug, index) in core.choose_from"
          :key="index"
        >
          <nuxt-link
            :to="
              localePath({ name: 'paths-slug', params: { slug: roadmapSlug } })
            "
          >
            <ChooseFromCard
              :roadmap="$store.getters.getRodmapInfo(roadmapSlug)"
              class="mr-4"/></nuxt-link
        ></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ChooseFromCard from '@/components/ChooseFromCard.vue'

export default {
  components: {
    ChooseFromCard,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    core: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto'
        // spaceBetween: 25
      },
      isVisibleDecisionPanel: false
    }
  },

  computed: {
    progress() {
      if (!this.core.concepts) {
        return
      }
      const conceptIdList = this.core.concepts.map((concept) => concept.id)
      return this.$store.getters.getCoreProgress(conceptIdList)
    },
    getTargeURL() {
      if (!this.core.to) {
        // expected in the following cenarios: 'available soon' cores (aka. no 'to="{target}"' property).
        return ''
      } else {
        return this.localePath({
          name: 'paths-slug-core',
          params: { slug: this.$route.params.slug, core: this.core.to }
        })
      }
    },
    isDecisionComponent() {
      return this.core.choose_from || false
    }
  }
}
</script>

<style scoped>
.progress-text {
  right: 0;
  position: absolute;
  top: -0.5rem;
}
.swiper-slide {
  width: auto;
}
.w-7 {
  width: 1.75rem;
}

.::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.carrousel {
  -ms-overflow-style: none;
}
</style>
