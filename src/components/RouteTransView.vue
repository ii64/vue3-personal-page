<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="route.meta.transitionName"
      :enter-active-class="route.meta.enterActiveClass"
      :leave-active-class="route.meta.leaveActiveClass"
    >
      <component
        :class="{
          'pt-page': true,
          'pt-page-current': route.meta.active,
          'pt-page-delay100': true,
          ...componentClass,
        }"
        :is="Component"
      />
    </transition>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'RouteTransView',
  props: {
    componentClass: Object,
    pot: Object,
  },
  mounted(): void {
    console.log('route trans view mounted')
  },
}
</script>
