<template>
  <div class="box-wrapper">
    <div class="inner-box-wrapper">
      <router-link class="menu-link" :to="to">
        <div class="valign-center">
          <i :class="iconClass" class="icon"></i>
          <h5>
            <span v-for="(x, index) in text.split(' ')" v-bind:key="index" class="tx">
              {{ x }}
            </span>
          </h5>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script lang="ts">
export default {
  name: 'BoxLink',
  props: {
    to: String,
    text: String,
    iconClass: String,
  },
}
</script>
