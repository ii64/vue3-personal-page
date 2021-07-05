<template>
  <transition name="fade" mode="out-in">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h1>{{ msg }} <i class="fab fa-line"></i></h1>

      <h1>{{ msg }}</h1>
      <h1>{{ msg }}</h1>

      <h1>{{ msg }}</h1>

      <h1>{{ msg }}</h1>

      <h1>{{ msg }}</h1>

      <h1>{{ msg }}</h1>

      <h1>{{ msg }}</h1>
      <h1>{{ msg }}</h1>
      <h1>{{ msg }}</h1>
      <h1>{{ msg }}</h1>
      <h1>{{ msg }}</h1>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>
