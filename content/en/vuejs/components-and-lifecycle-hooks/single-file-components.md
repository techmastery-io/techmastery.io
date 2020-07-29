---
title: Single File Components
id: jK5fAGbOfje-kOSFH0X7y
---

> When creating a project using `vue-cli` , SFCs will be ready to be used as we've seen here @todo[link to 1st concept]. No additional configurations are required.

<link-bookmark href="https://www.youtube.com/watch?v=FWQSuskE5UA" title="Components and .vue files | Learning the Basics">In this video, notice that the author uses `vue-cli` to create the project.</link-bookmark>

<link-bookmark href="https://vuejs.org/v2/guide/single-file-components.html" title="Single File Components - Vue.js">The official documentation explains really well all the benefits of using SFC files. This is the recommended approach and also how most Vue.js projects out there are structured:
</link-bookmark>

### What people are saying:

Sarah lists some great benefits of using SFC over separated html/css/js files:

<blockquote class="twitter-tweet mx-auto"><p lang="en" dir="ltr">A friend recently asked me this question: “what&#39; s the benefit of using .vue files for single file components, vs creating a component with separate html/css/js files?” <br><br>This is a really good question! I&#39; ll answer with my own opinion publicly in case it&#39; s helpful (thread)</p>&mdash; Sarah Drasner (@sarah_edo) <a href="https://twitter.com/sarah_edo/status/968609187432423424?ref_src=twsrc%5Etfw">February 27, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### TL; DR

What does a SFC look like?

The basic structure of a single-file component is:

* `<template>` section
* `<script>` section
* `<style>` section

``` html
<template>
    <div>
        <!-- the root element doesn't necessarily need to be a div -->
    </div>
</template>

<script>
    export default {}
</script>

<style></style>
```

For example:

``` html
// TodoList.vue

<template>
    <ul>
        <li v-for="todo in todoList" :key="todo.id">{{ todo.name }}</li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                todoList: [
                    // an array of todo's should go here...
                ]
            }
        }
    }
</script>

<style scoped>
    li {
        color: green;
    }
</style>
```
