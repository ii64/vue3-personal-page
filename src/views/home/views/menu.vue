<template>
  <div class="inner-content">
    <div class="head-content">
      <h3>
        Hello I'm <span :class="colorAccentClass">{{ headName }}</span>
      </h3>
      <h5>
        <typed-effect
          :erasing="true"
          :typingClass="colorAccentClass"
          :prefix="headSubName.prefix"
          :text="headSubName.text"
          :typingAwait="headSubName.typingAwait"
          :typingDelay="headSubName.typingDelay"
          :eraseDelay="headSubName.erasingDelay"
          :eraseAwait="headSubName.erasingAwait"
          :onFinish="animationTypingOnFinish"
        />
      </h5>
    </div>
    <div class="content">
      <box-link iconClass="fas fa-id-card fa-3x" to="/home/about" text="About Me" />
      <box-link iconClass="fas fa-newspaper fa-3x" to="/home/resume" text="My Resume" />
      <box-link iconClass="fas fa-toolbox fa-3x" to="/home/portofolio" text="My Portofolio" />
      <box-link iconClass="fas fa-envelope fa-3x" to="/home/contact" text="Contact Me" />
    </div>
  </div>
</template>

<script lang="ts">
import TypedEffect, { ITypedEffectEvent } from '@/components/TypedEffect.vue'
import BoxLink from '../components/BoxLink.vue'

interface IHeadSubName {
  prefix?: string
  text?: string
  typingDelay: number
  typingAwait: number
  erasingDelay: number
  erasingAwait: number
}
interface IData {
  headName: string
  asIdx: number
  asData: IHeadSubName[]
  headSubName: IHeadSubName
}
export default {
  components: { TypedEffect, BoxLink },
  name: 'HomeMenu',
  props: {
    colorAccentClass: String,
  },
  data: (): IData => {
    return {
      asIdx: 0,
      asData: [
        {
          text: 'Student',
          typingDelay: 100,
          typingAwait: 2000,
          erasingDelay: 50,
          erasingAwait: 1000,
        },
        {
          text: 'Programmer',
          typingDelay: 150,
          typingAwait: 3000,
          erasingDelay: 75,
          erasingAwait: 1000,
        },
      ],
      headName: 'ii64',
      headSubName: {
        prefix: 'As a ',
        text: '',
        typingDelay: 0,
        typingAwait: 0,
        erasingDelay: 50,
        erasingAwait: 1000,
      },
    }
  },
  beforeMount(): void {
    this.setNextAsData()
  },
  methods: {
    setNextAsData(): void {
      this.setAsData(this.$data.asIdx++ % this.$data.asData.length)
    },
    setAsData(i: number): void {
      const { prefix, text, typingDelay, typingAwait, erasingDelay, erasingAwait } =
        this.$data.asData[i]
      if (prefix && prefix.length > 0) {
        this.headSubName.prefix = prefix
      }
      if (text && text.length > 0) {
        this.headSubName.text = text
      }
      if (typingDelay && typingDelay > 0) {
        this.headSubName.typingDelay = typingDelay
      }
      if (typingAwait && typingAwait > 0) {
        this.headSubName.typingAwait = typingAwait
      }
      if (erasingDelay && erasingDelay > 0) {
        this.headSubName.erasingDelay = erasingDelay
      }
      if (erasingAwait && erasingAwait > 0) {
        this.headSubName.erasingAwait = erasingAwait
      }
    },
    animationTypingOnFinish(ev: ITypedEffectEvent): void {
      if (!ev.data.typedErase) {
        this.setNextAsData()
      }
      //   console.log(ev.rd_typingDelay, ev.rd_typingAwait, ev.rd_eraseDelay, ev.rd_eraseAwait)
    },
  },
}
</script>
