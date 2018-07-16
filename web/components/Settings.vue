<template>
  <div class="settings">
    <button @click="scan = !scan" :aria-checked="scan" :disabled="!canScan">
      Scan clipboard: {{scan ? 'Yes' : 'No'}}
    </button>
  </div>
</template>

<script>
  import { playlistAttributes } from '~/assets/js/playlistAttributes'
  import { TYPE } from '~/assets/js/symbols'

  export default {
    mixins: [playlistAttributes],
    data () {
      return {
        scan: false,
        canScan: false,
      }
    },
    mounted () {
      this.canScan = !!navigator.clipboard
      window.addEventListener('focus', this.scanClipboard)
    },
    destroyed () {
      window.removeEventListener('focus', this.scanClipboard)
    },
    methods: {
      scanClipboard () {
        if (this.scan) {
          this.readClipboard()
        }
      },
      readClipboard () {
        navigator.clipboard.readText().then(input => {
          let shouldHandleInput = true
          if (this.lastReaderHistoryEntry) {
            const differentInputThanLast =
              this.lastReaderHistoryEntry.input !== input
            const lastEntryWasNotDropped =
              this.lastReaderHistoryEntry.type !== TYPE.DROP
            shouldHandleInput = differentInputThanLast && lastEntryWasNotDropped
          }
          if (shouldHandleInput) {
            this.$store.dispatch('reader/handleInput', {
              input,
              type: TYPE.AUTO_CLIPBOARD
            })
          }
          // resets last reader history entry
          this.$store.commit('reader/addHistory')
        })
      }
    },
    computed: {
      readerHistory () {
        return this.$store.state.reader.history
      },
      lastReaderHistoryEntry () {
        return this.readerHistory[this.readerHistory.length - 1]
      }
    }
  }
</script>
