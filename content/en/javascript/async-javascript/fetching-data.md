---
title: Fetching data
id: xp48RqRD789lQnAWv3Fo9
---
<!-- 
As most of the things in programming, there are different ways to accomplish something. Fetching data is no different:

* There's the old way, using `XMLHttpRequest` , which it's important to understand in case you come across it.

* There's the new way, using `fetch` (aka. the fetch API), which ... @todo

* And there's another popular way which is using **Axios**, very common when working with React or Vue.js.

Instead of trying to learn all of them at the same time you could stick with `fetch` for now. And if you ever come across the old `XMLHttpRequest` , you can stop and "learn it", as it might take you less than an hours to learn if you already know the Fetch API.

Then, dive in Axios when you start to work with a front-end library/framework like Vue.js or React. -->

<link-bookmark href="https://youtu.be/cuEtnrL9-H0" title="Learn Fetch API In 6 Minutes">

> Accessing data from an API is one of the most common things you will do in web development, and the way to access APIs is with fetch. Fetch is function built into JavaScript that allows you to query any URL/API to get back data. The most important part is that fetch is asynchronous so it will run in the background and let you know when it finishes using promises. In this video I will show you exactly how to use fetch, and all of the common mistakes people make using fetch so you can get up and running in just six minutes.

</link-bookmark>

<link-bookmark href="https://www.youtube.com/watch?v=tc8DU14qX6I" title="fetch() - Working With Data & APIs in JavaScript">

> How do you retrieve, collect, and store data? The course will be taught through a series of creating three data projects.

</link-bookmark>

## The retired `XMLHttpRequest`

It's important to know that before the **Fetch API** was released, another interface was widely used instead to fetch data: the `XMLHttpRequest` (XHR).

You will probably come across it when working on existing codebases or technical documentation that have not yet migrated to the new Fetch API.

The good news is that it works very similarly to the Fetch API, so you won't have to put forth any extra effort to learn/understand it.

In the brilliant video below (over 21K likes, wow!), the author reviews some fundamental concepts and uses XHR to fetch data: 

<link-bookmark href="https://www.youtube.com/watch?v=rJesac0_Ftw" title="JSON and AJAX Tutorial: With Real Examples">

> In this JavaScript tutorial we learn what JSON and AJAX are and how to use them to load new data into our webpage on-the-fly.

</link-bookmark>

How about recreating this project in two different versions? One with `XMLHttpRequest` and another one with `fetch` to reinforce your learning?
