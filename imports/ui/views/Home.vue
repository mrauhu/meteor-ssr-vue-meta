<template>
  <article class="home">
    <h1>Home</h1>

    <h2><code>vue-meta: {{vueMetaVersion}}</code></h2>
  </article>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  // noinspection JSAnnotator
  export default {
    name: 'Home',
    async serverPrefetch() {
      // noinspection JSValidateTypes
      await this.init();
    },
    beforeMount() {
      if (!this.vueMetaVersion) {
        // noinspection JSValidateTypes
        this.init();
      }
    },
    computed: {
      ...mapState('debug', [
        'vueMetaVersion',
      ]),
    },
    methods: {
      ...mapActions('debug', [
        'init'
      ]),
    },
  };
</script>
