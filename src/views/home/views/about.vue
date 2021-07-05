<template>
  <div class="inner-content">
    <div class="head-content">
      <h3>About <span :class="colorAccentClass">Me</span></h3>
      <h5>Testing</h5>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeAbout',
  props: {
    colorAccentClass: String,
  },
}
</script>
