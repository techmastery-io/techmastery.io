---
title: Programmatic navigation
id: iMi0hoM2JfSHeuMIvj9tt
---

As mentioned in the official documentation: "Aside from using `<router-link>` to create anchor tags for declarative navigation, we can do this programmatically using the router's instance methods."

We have the following methods available:

* `this.$router.push(location, onComplete?, onAbort?)` 
* `this.$router.replace(location, onComplete?, onAbort?)` 
* `this.$router.go(n)` 

The different between `push()` and `replace()` is that `push()` go to a new route and adds a new item to the browser history. `replace()` , however, does the same but does not push a new entry into the history stack.

``` javascript
// literal string path
router.push('home')

// object
router.push({
    path: 'home'
})

// named route
router.push({
    name: 'user',
    params: {
        userId: '123'
    }
})

// with query, resulting in /register?plan=private
router.push({
    path: 'register',
    query: {
        plan: 'private'
    }
})
```

<link-bookmark href="https://router.vuejs.org/guide/essentials/navigation.html" title="Programmatic Navigation | Vue Router"></link-bookmark>
