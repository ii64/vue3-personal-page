<template>
  <div class="inner-content">
    <div class="head-content">
      <h3>My <span :class="colorAccentClass">Portofolio</span></h3>
      <h5>Testing</h5>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePortofolio',
  props: {
    colorAccentClass: String,
  },
}
</script>
