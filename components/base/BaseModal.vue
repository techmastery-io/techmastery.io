<template>
  <div v-if="show" class="modal-overlay px-5 md:px-0" @click="$emit('close')">
    <div class="modal absolute  px-4 w-full m-auto" @click.stop>
      <!-- Modal content -->
      <div class="bg-white p-8 shadow-xl w-full max-w-md rounded-lg  m-auto">
        <div class="text-right ">
          <span class="inline-block cursor-pointer" @click="$emit('close')">
            <CloseIcon
              class="w-5 h-auto transform hover:scale-110 transition-transform duration-200"
            />
          </span>
        </div>
        <h2 class="text-2xl mb-3"><slot name="header"></slot></h2>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  background-color: #ffffffbd;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  transition: all 0.3s;
  /* transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s; */
}
.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
