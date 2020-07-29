<template>
  <div class="mx-auto text-center">
    <div class="lds-ellipsis mx-auto">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <h2 class="text-2xl">Logging in...</h2>
  </div>
</template>

<script>
export default {
  created() {
    if (process.client) {
      const provider = this.$route.params.provider
      if (!provider) {
        throw new Error('No provider has been given.')
      }
      // Send url.query back to the backend
      this.$axios
        .get(`/auth/${provider}/callback`, {
          params: this.$route.query
        })
        .then((response) => {
          this.$auth.setUserToken(response.data.jwt)
          this.$auth.setUser(response.data.user)
          this.$toast.show('Logged in as ' + response.data.user.email)
          this.$router.push({ path: '/', query: {} })
        })
    }
  }
}
</script>

<style scoped>
.lds-ellipsis {
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  @apply bg-primary;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
