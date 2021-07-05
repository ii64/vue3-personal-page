<template>
  <!-- div id="nav">
    <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
    <router-link to="/home/about">Home About</router-link> |
    <router-link to="/home/contact">Home About</router-link>
  </div -->
  <div class="pt-perspective">
    <route-trans-view />
  </div>
</template>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.css';
@import '~swiper/swiper.scss';

@import '~markdown-it-latex/dist/index.css';
@import '~highlight.js/styles/monokai.css';

@import 'assets/styles/main.scss';
</style>

<script lang="ts">
import RouteTransView from './components/RouteTransView.vue'
export default {
  name: 'App',
  components: {
    RouteTransView,
  },
}
</script>
