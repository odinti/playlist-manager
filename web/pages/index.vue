<template>
  <div>
    <main>
      <div class="center space">
        <img src="~/assets/img/yt.png" alt="Youtube" draggable="false">
        <no-ssr>
          <instance-selector/>
        </no-ssr>
      </div>
      <div class="space">
        <h1>Playlist Manager</h1>
        <p>
          Paste a link anywhere or drag a link into the window
        </p>
      </div>
      <div class="center">
        <settings/>
        <controls/>
      </div>
      <playlist/>
      <actions/>
    </main>
    <link-drop-zone/>
    <paste-listener/>
  </div>
</template>

<script>
  import LinkDropZone from '~/components/LinkDropZone.vue'
  import PasteListener from '~/components/PasteListener.vue'
  import Settings from '~/components/Settings.vue'
  import Controls from '~/components/Controls.vue'
  import Playlist from '~/components/Playlist.vue'
  import Actions from '~/components/Actions.vue'
  import InstanceSelector from '../components/InstanceSelector'

  export default {
    components: {
      InstanceSelector,
      LinkDropZone,
      PasteListener,
      Settings,
      Controls,
      Playlist,
      Actions
    },
    methods: {
      readClipboard () {
        navigator.clipboard.readText().then(input => {
          this.$store.dispatch('reader/handleInput', {input})
        })
      }
    }
  }
</script>

<style lang="scss">
  .center {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .space {
    margin-bottom: 3rem;
  }
</style>
