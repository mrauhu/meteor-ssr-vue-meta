<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    metaInfo: () => ({
      title: `vue-meta and Meteor+Vue SSR`,
    }),
  };
</script>
