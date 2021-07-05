<template>
  <div class="about">
    <h1>
      <typed-effect :typingDelay="100" :prefix="headTitle.prefix" :text="headTitle.text" />
    </h1>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="o in slide" v-bind:key="o.id">
        <div class="card p-2">
          {{ o.val }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { SwiperEvents } from 'swiper/types'
import TypedEffect from '@/components/TypedEffect.vue'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default {
  components: {
    Swiper,
    SwiperSlide,
    TypedEffect,
  },
  data: (): unknown => {
    return {
      headTitle: {
        prefix: 'This is ',
        text: 'about page',
      },
      slide: [
        { id: 1, val: 'Slide 1' },
        { id: 2, val: 'Slide 2' },
        { id: 3, val: 'Slide 3' },
        { id: 4, val: 'Slide 4' },
        { id: 5, val: 'Slide 5' },
      ],
    }
  },
  methods: {
    onSwiper(swiper: SwiperEvents): void {
      console.log(swiper)
    },
    onSlideChange(): void {
      console.log('slide change')
    },
  },
}
</script>
