<template>
  <div class="actions">
    <button @click="clearList" :disabled="isPlaylistEmpty">Clear playlist</button>
  </div>
</template>

<script>
  import {EventBus} from '~/assets/js/websocketEventBus'
  import { playlistAttributes } from '~/assets/js/playlistAttributes'

  export default {
    mixins: [playlistAttributes],
    methods: {
      clearList () {
        if (confirm('Clear list?')) {
          EventBus.$emit('clear')
        }
      }
    }
  }
</script>

<style lang="scss">
  .actions {
    display: flex;
    justify-content: space-between;
  }
</style>
