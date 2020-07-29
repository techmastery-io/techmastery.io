---
title: Using Axios to Consume a REST API
id: OOKCcoOTmK9h7PzDzgrar
---

How to fetch data with Vue.js?

> There are many times when building application for the web that you may want to consume and display data from an API. There are several ways to do so, but a very popular approach is to use axios, a promise-based HTTP client. - [Vue.js official docs](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

What does Axios look like?

``` jsx
new Vue({
  el: '#app',
  data () {
    return {
      todo: null
    }
  },
  mounted () {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => (this.todo = response.data))
  }
})
```

<link-bookmark href="https://www.digitalocean.com/community/tutorials/vuejs-rest-api-axios" title="Vue.js REST API Consumption with Axios | DigitalOcean">Quite a few frameworks have built-in HTTP APIs. Angular 2 has the http module, JQuery has $.ajax, and, up until Vue 2.0, Vue.js had vue-resource. In Vue 2.0, the developers decided that having a built-in http client module was rather redundant, and could be better serviced by third-party libraries. The alternative most frequently recommended is Axios.</link-bookmark>

<link-bookmark href="https://www.youtube.com/watch?v=UIm-YqYKutk" title="Making HTTP Requests with Axios, API Example">In this video: Axios installation and general usage</link-bookmark>
