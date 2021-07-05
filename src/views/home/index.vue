<template>
  <div id="home" style="height: 85vh">
    <div class="main-content">
      <div class="row no-gutters v-full">
        <div class="left-wrapper col-12 col-lg-8">
          <div class="hanging">
            <div class="logo-hanging">
              <span :class="colorAccentClass">
                <i :class="sideIconClass"></i>
              </span>
            </div>
            <div class="text-hanging">
              <div class="word">
                <h6>
                  <span
                    v-for="(x, index) in sideText.split(' ')"
                    v-bind:key="index"
                    :class="colorAccentClass"
                    class="side-text-g"
                  >
                    {{ x }}
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <div style="position: relative; width: 100%; height: 100%">
            <route-trans-view :colorAccentClass="colorAccentClass" />
          </div>
        </div>
        <div class="right-wrapper col-lg-4">
          <div class="lg-profile-picture">
            <div class="row">
              <h1>rer</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tx:nth-child(1n + 2),
.tx-i {
  color: #ff9472;
}
@import 'style/main.scss';
</style>

<script lang="ts">
import { RouteRecordRaw } from 'vue-router'
import RouteTransView from '../../components/RouteTransView.vue'
interface IData {
  colorAccentClass: string

  sideText: string
  sideIconClass: string
}

export default {
  name: 'Home',
  components: {
    RouteTransView,
  },
  data: (): IData => {
    return {
      colorAccentClass: 'cc1',

      sideText: 'MY  PERSONAL PAGE',
      sideIconClass: 'fas fa-code',
    }
  },
  methods: {
    changeAccentColor(rpath?: string): void {
      switch (rpath ?? this.$route.path) {
        case '/home/about':
          this.$data.colorAccentClass = 'cc2'
          break
        case '/home/resume':
          this.$data.colorAccentClass = 'cc3'
          break
        case '/home/portofolio':
          this.$data.colorAccentClass = 'cc4'
          break
        case '/home/contact':
          this.$data.colorAccentClass = 'cc5'
          break
        default:
          this.$data.colorAccentClass = 'cc1'
          break
      }
    },
  },
  watch: {
    $route(newVal: RouteRecordRaw): void {
      this.changeAccentColor(newVal.path)
    },
  },
  mounted(): void {
    this.changeAccentColor()
  },
}
</script>
