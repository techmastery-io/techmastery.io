export default function({ $axios, app }) {
  $axios.onError((error) => {
    // window.alert('Oops, something went wrong.')
    app.$toast.error('Oops, something went wrong.')
    if (error.response.status === 500) {
    }
  })
}
