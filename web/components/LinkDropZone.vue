<template>
  <transition name="slide-in">
    <div class="drop__overlay" v-if="dropping" @drop="readDropQueue" @click="hideDrop">
      <div class="drop__center">
        <div class="drop__general">Add to queue</div>
        <div class="drop__zone" v-if="playlist.length > 0" @drop="readDropNow" @dragenter="handleOverEnter"
             @dragleave="handleOverLeave">Play now
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { MODIFIER, TYPE } from '~/assets/js/symbols'
  import { playlistAttributes } from '~/assets/js/playlistAttributes'

  export default {
    mixins: [playlistAttributes],
    data () {
      return {
        dropping: 0
      }
    },
    mounted () {
      window.addEventListener('dragover', this.prevent)
      window.addEventListener('drop', this.prevent)
      window.addEventListener('dragenter', this.dragEnter)
      window.addEventListener('dragleave', this.dragLeave)
      window.addEventListener('blur', this.hideDrop)
    },
    destroyed () {
      window.removeEventListener('dragover', this.prevent)
      window.removeEventListener('drop', this.prevent)
      window.removeEventListener('dragenter', this.dragEnter)
      window.removeEventListener('dragleave', this.dragLeave)
      window.removeEventListener('blur', this.hideDrop)
    },
    methods: {
      handleOverEnter (e) {
        e.target.classList.add('over')
      },
      handleOverLeave (e) {
        e.target.classList.remove('over')
      },
      hideDrop () {
        this.dropping = 0
      },
      prevent (e) {
        e.preventDefault()
      },
      dragEnter (e) {
        e.stopPropagation()
        this.dropping++
      },
      dragLeave (e) {
        this.dropping--
      },
      readDropNow (e) {
        e.preventDefault()
        e.stopPropagation()
        this.dropping = 0
        let input = e.dataTransfer.getData('text')
        this.$store.dispatch('reader/handleInput', {input, type: TYPE.DROP, modifier: MODIFIER.NOW})
      },
      readDropQueue (e) {
        e.preventDefault()
        e.stopPropagation()
        this.dropping = 0
        let input = e.dataTransfer.getData('text')
        this.$store.dispatch('reader/handleInput', {input, type: TYPE.DROP, modifier: MODIFIER.QUEUE})
      }
    }
  }
</script>

<style lang="scss">
  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: transform 400ms;
  }

  .slide-in-enter,
  .slide-in-leave-to {
    transform: translateX(100vw);
  }

  .slide-in-enter-to,
  .slide-in-leave {
    transform: translateX(0);
  }

  .drop__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .drop__center {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      width: 100%;
      .drop__general {
        font-size: 4vmax;
        text-align: center;
        margin-bottom: 2vmax;
      }
      .drop__zone {
        flex: auto;
        padding: 10px;
        border: 1px dashed #aaa;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3vmax;
        transition: 200ms;
        &.over {
          background: rgb(218, 218, 218);
        }
      }
    }
  }
</style>

