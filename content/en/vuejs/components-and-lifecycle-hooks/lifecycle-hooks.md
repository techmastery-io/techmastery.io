---
title: Lifecycle hooks
id: K-cIL8idkuZGgHvJ65t9m
---
@todo content

**What are some real use-cases scenarios?**

It's common to see the `created` hook used to go and grab external data (from APIs, for example).

``` jsx
created () {
    // fetch the data when the view is created 
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
```

<link-bookmark href="https://scotch.io/courses/getting-started-with-vuejs/vue-lifecycle-events" title="Vue Lifecycle Events"></link-bookmark>

<link-bookmark href="https://www.youtube.com/watch?v=bWHJeIzVCqA" title="Easy Way to Understand the VueJS Component Lifecycle Hooks">This video explores the following hooks: `created` , `mounted` , `updated` , `destroyed` and their `before*` variations.
</link-bookmark>
