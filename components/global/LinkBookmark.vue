<!-- We're using Vue Functional components here -->
<template functional>
  <div class="link-bookmark rounded-lg border mb-4">
    <!-- The above parent div has been added so the parent scoped styles won't leak into this component -->
    <p
      v-if="$options.hasDefaultSlot(slots().default)"
      class="m-4 text-gray-800"
    >
      <slot class="slot-content" />
    </p>
    <a
      :href="props.href"
      target="_blank"
      class="flex cursor-pointer rounded-md hover:bg-gray-100"
    >
      <div
        class="flex py-2 mx-4 flex-grow items-center max-w-full min-w-0"
        :class="{ 'border-t ': $options.hasDefaultSlot(slots().default) }"
      >
        <div v-if="!$options.getvideoId(props.href)" class=" ">
          <component :is="$options.getIcon(props)" class="h-4 w-auto mr-3" />
        </div>
        <div class="content min-w-0">
          <h5 class="text-sm  md:text-base m-0 font-medium">
            {{ props.title }}
          </h5>
          <p v-if="props.concepts.length" class="text-xs text-gray-600">
            {{ props.concepts.join(' · ') }}
          </p>
          <div class="mt-1 flex items-center min-w-0">
            <img
              class="inline h-3 sm:h-4 w-auto mr-2"
              :src="$options.getFavIcon(props.href)"
            />

            <span class="text-xs truncate block text-gray-500 ">
              {{ props.href }}
            </span>
          </div>
        </div>
      </div>
      <!-- Thumbnail -->
      <!-- @todo is there a more effective/optimized way to run this regex? -->
      <div
        v-if="$options.getvideoId(props.href)"
        class="h-24 w-24 sm:w-48 flex-shrink-0"
      >
        <img
          class="h-full w-full"
          style="object-fit: cover; "
          :src="`//img.youtube.com/vi/${$options.getvideoId(props.href)}/0.jpg`"
        />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  functional: true,

  props: {
    href: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    concepts: {
      type: Array,
      default() {
        return []
      }
    },
    icon: {
      type: String,
      default: null
    }
  },
  hasDefaultSlot(node) {
    // Using a component with slot in markdown returns an element.text == '\n'
    // when no slot is passed. Ex: <link-bookmark></link-bookmark>

    return !(node.length === 1 && node[0].text === '\n')
  },
  getFavIcon(url) {
    const domain = url
      .replace('http://', '')
      .replace('https://', '')
      .split(/[/?#]/)[0]
    return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`
  },
  getIcon(props) {
    if (!props.icon) {
      const url = props.href

      if (url.includes('youtube.') || url.includes('youtu.')) {
        return 'YoutubeIcon'
      } else if (url.includes('github.')) {
        return 'GitHubIcon'
      }
    } else {
      return props.icon
    }
  },
  getvideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
  }
}
</script>
<style>
.link-bookmark {
  @apply mt-4 mb-8 !important;
}
.link-bookmark blockquote {
  position: relative;
}

.link-bookmark blockquote::before {
  content: '“';
  font-size: 80px;
  font-family: Georgia, Serif;
  position: absolute;
  top: -54px;
  left: -1.5rem;
  @apply text-gray-300;
}
</style>
