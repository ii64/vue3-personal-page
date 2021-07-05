<template>
  <div class="inner-content">
    <div class="head-content">
      <h3>My <span :class="colorAccentClass">Resume</span></h3>
      <h5>Testing</h5>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeResume',
  props: {
    colorAccentClass: String,
  },
}
</script>
