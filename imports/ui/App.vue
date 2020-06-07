<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  import { Meteor } from 'meteor/meteor';

  function platformLog(...args) {
    const platform = Meteor.isServer
      ? 'server'
      : 'client';
    console.log(platform, ...args);
  }

  export default {
    name: 'App',
    metaInfo: () => ({
      title: `vue-meta and Meteor+Vue SSR`,
    }),
    serverPrefetch() {
      platformLog('serverPrefetch()');
    },
    beforeCreate() {
      platformLog('beforeCreate()');
    },
    created() {
      platformLog('created()');
    },
    beforeMount() {
      platformLog('beforeMount()');
    },
    mounted() {
      platformLog('mounted()');
    },
    beforeDestroy() {
      platformLog('beforeDestroy()');
    },
    destroyed() {
      platformLog('destroyed()')
    },
  };
</script>
