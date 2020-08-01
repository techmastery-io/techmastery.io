<template>
  <section class="py-8 px-4 my-4 w-full">
    <div class="flex flex-wrap">
      <div class="w-full px-6">
        <div class="w-full max-w-sm mx-auto text-center">
          <div class="text-4xl mb-4">
            <Logo class="h-32 w-auto inline-block" />
          </div>
          <div class="text-3xl mb-10">Great to have you with us!</div>
          <div class="flex flex-col mx-auto items-center ">
            <GoogleSigninButton class="mb-8" />
            <!-- <GitHubSigninButton /> -->
          </div>
        </div>
      </div>
      <hr class="border mx-auto w-full max-w-lg my-10 border-gray-100" />
      <div class="w-full text-center">
        <p class="text-sm">We require social login to prevent abuse.</p>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleSigninButton from '@/components/GoogleSigninButton.vue'
// import GitHubSigninButton from '@/components/GitHubSigninButton.vue'
export default {
  components: {
    GoogleSigninButton
    // GitHubSigninButton
  },
  data() {
    return {
      login: {
        identifier: 'nathan',
        password: '123456'
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login
        })
        this.$auth.setUser(response.data.user)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }
  }
}
</script>
<style scoped>
.input-field {
  @apply appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded;
}
.input-field:focus {
  @apply bg-white border-gray-500 outline-none;
}
</style>
