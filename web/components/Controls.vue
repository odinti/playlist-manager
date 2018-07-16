<template>
  <div class="controls">
    <button @click="next" :disabled="isPlaylistEmpty">Next</button>
  </div>
</template>

<script>
  import { playlistAttributes } from '~/assets/js/playlistAttributes'
  import { EventBus } from '~/assets/js/websocketEventBus'

  export default {
    mixins: [playlistAttributes],
    methods: {
      next () {
        EventBus.$emit('next')
      }
    }
  }
</script>
