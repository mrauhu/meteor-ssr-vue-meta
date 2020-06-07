<template>
  <article class="not-found">
    <h1>404</h1>
    <p>
      <router-link :to="{ name: 'home'}">&larr;</router-link>
    </p>
  </article>
</template>

<script>
  export default {
    name: 'NotFound',
    metaInfo: {
      title: '404',
    },
  };
</script>
