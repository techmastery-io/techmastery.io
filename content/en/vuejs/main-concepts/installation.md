---
title: Installation and vue-cli
id: wbg1kCIThZ89Xv-fneKnc
---

Use `npm` or `yarn` to install `vue-cli` :

``` bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Then, to create a new project run:

``` bash
vue create my-project

# OR, using the graphical interface:
vue ui
```

<LinkBookmark href="https://cli.vuejs.org/guide/creating-a-project.html" title="Creating a Project | Vue CLI"></LinkBookmark>

### Creating a project without vue-cli

If you want to create a project from scratch, without using `vue-cli` , here's some of the things that you will have to configure:

* Webpack
* Install all the dependencies
* Create all the initial files

<LinkBookmark href="https://www.freecodecamp.org/news/how-to-create-a-vue-js-app-using-single-file-components-without-the-cli-7e73e5b8244f/" title="How to create a Vue.js app without the CLI">According to the author: "Understanding the build process behind the frameworks you use will help you to better understand the framework itself."
</LinkBookmark>
