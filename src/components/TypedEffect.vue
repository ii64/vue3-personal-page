<template>
  <div class="typed-effect">
    <span v-if="data.show">
      <span :class="prefixClass">{{ rd_prefix }}</span>
      <span :class="typingClass">
        <span class="typing">{{ data.typedText }}</span>
        <span
          :class="{ 'typed-caret': true, caretClass }"
          :style="{ 'animation-iteration-count': data.caret.blink ? 'infinite' : '0' }"
        >
          {{ rd_caretChar }}
        </span>
      </span>
    </span>
  </div>
</template>

<style lang="scss">
$caretBlinkTick: 0.55s;

.typed-effect {
  .typed-effect {
    display: flex;
  }
  //.typing {}
  .typed-caret {
    opacity: 1;
    font-weight: 300;
    -webkit-animation: caretBlink $caretBlinkTick infinite;
    animation: caretBlink $caretBlinkTick infinite;
  }
}
@-webkit-keyframes caretBlink {
  50% {
    opacity: 0;
  }
}
@keyframes caretBlink {
  50% {
    opacity: 0;
  }
}
</style>

<script lang="ts">
export interface ICaretData {
  blink: boolean
}
export interface IData {
  show: boolean
  typedLoopSkip: boolean
  typedIndex: number
  typedText: string
  typedErase: boolean
  caret: ICaretData
}

export interface ITypedEffectEvent {
  data: IData

  runningInterval?: number
  runningTick?: number

  rd_prefix?: string
  rd_text: string
  rd_caretChar: string
  rd_typingDelay: number
  rd_typingAwait: number

  rd_erasing: boolean
  rd_eraseDelay: number
  rd_eraseAwait: number
}

export default {
  name: 'TypedEffect',
  data: (): ITypedEffectEvent => {
    return {
      data: {
        show: true,
        typedLoopSkip: false,
        typedIndex: 0,
        typedText: '',
        typedErase: false,
        caret: {
          blink: true,
        },
      },
      rd_prefix: '',
      rd_text: '',
      rd_caretChar: '',
      rd_typingDelay: 0,
      rd_typingAwait: 0,
      rd_erasing: false,
      rd_eraseDelay: 0,
      rd_eraseAwait: 0,
    }
  },
  props: {
    prefix: String,
    typingClass: [String, Object],
    caretClass: [String, Object],
    prefixClass: [String, Object],
    text: {
      type: String,
      required: true,
    },
    caretChar: {
      type: String,
      default: '|',
    },
    typingDelay: {
      type: Number,
      default: 100,
    },
    typingAwait: {
      type: Number,
      default: 1500,
    },

    erasing: {
      type: Boolean,
      default: false,
    },
    eraseDelay: {
      type: Number,
      default: 50,
    },
    eraseAwait: {
      type: Number,
      default: 1000,
    },

    // calbacks when do next
    onFinish: {
      type: Function,
      default: (ev: ITypedEffectEvent): void => {
        console.log(ev)
      },
    },
  },
  watch: {
    prefix(newVal: string): void {
      this.$data.rd_prefix = newVal
    },
    text(newVal: string): void {
      this.$data.rd_text = newVal
      if (newVal.length > 0) {
        this.$data.data.show = true
      }
    },
    caretChar(newVal: string): void {
      this.$data.rd_caretChar = newVal
    },
    typingDelay(newVal: number): void {
      this.$data.rd_typingDelay = newVal
    },
    typingAwait(newVal: number): void {
      this.$data.rd_typingAwait = newVal
    },
    erasing(newVal: boolean): void {
      this.$data.rd_erasing = newVal
    },
    eraseDelay(newVal: number): void {
      this.$data.rd_eraseDelay = newVal
    },
    eraseAwait(newVal: number): void {
      this.$data.rd_eraseAwait = newVal
    },

    runningInterval(newVal: number): void {
      this.$data.runningInterval = newVal
      this.refreshTick()
    },
  },
  methods: {
    invokeOnFinish(): void {
      this.onFinish(this.$data)
    },
    invokeTick(): void {
      if (!this.$data.data.show) return
      if (this.$data.data.typedLoopSkip) return
      this.$data.data.caret.blink = false
      this.$data.data.typedText = this.rd_text?.substring(0, this.$data.data.typedIndex)
      if (!this.$data.data.typedErase) {
        this.$data.data.typedIndex = this.$data.data.typedIndex + 1
      } else {
        this.$data.data.typedIndex = this.$data.data.typedIndex - 1
      }
      if (this.$data.data.typedIndex > this.text.length) {
        this.$data.data.caret.blink = true
        this.$data.data.typedLoopSkip = true
        if (this.rd_erasing) {
          // erase mode
          this.$data.data.typedErase = true

          this.$data.runningInterval = this.$data.rd_eraseDelay
          this.refreshTick()
          this.invokeOnFinish()
        } else {
          this.$data.data.typedIndex = 0
        }
        setTimeout((): void => {
          this.$data.data.typedLoopSkip = false
        }, this.typingAwait)
      }
      if (this.$data.data.typedErase && this.$data.data.typedIndex < 0) {
        this.$data.data.typedIndex = 0
        this.$data.data.caret.blink = true
        // typing mode
        this.$data.data.typedErase = false

        this.$data.runningInterval = this.$data.rd_typingDelay
        this.refreshTick()
        this.invokeOnFinish()
        this.$data.data.typedLoopSkip = true
        setTimeout((): void => {
          this.$data.data.typedLoopSkip = false
        }, this.eraseAwait)
      }
    },
    refreshTick(i?: number): void {
      if (this.$data.runningTick) {
        clearInterval(this.$data.runningTick)
      }
      const tickInterval = i ? i : this.$data.runningInterval
      // console.log('refresh tick', i, tickInterval)
      this.$data.runningTick = setInterval(this.invokeTick.bind(this), tickInterval)
    },
  },
  created(): void {
    if (this.text == null || this.text.length < 1) {
      this.$data.data.show = false
    }
    this.$data.rd_prefix = this.prefix
    this.$data.rd_text = this.text
    this.$data.rd_caretChar = this.caretChar
    this.$data.rd_typingDelay = this.typingDelay
    this.$data.rd_typingAwait = this.typingAwait
    this.$data.rd_erasing = this.erasing
    this.$data.rd_eraseDelay = this.eraseDelay
    this.$data.rd_eraseAwait = this.eraseAwait
    if (!this.$data.data.typedErase) {
      this.$data.runningInterval = this.$data.rd_typingDelay
    } else {
      this.$data.runningInterval = this.$data.rd_eraseDelay
    }
  },
  mounted(): void {
    if (this.text == null) return
    this.refreshTick()
  },
}
</script>
