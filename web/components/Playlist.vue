<template>
  <div>
    <h2>Songs</h2>
    <ul>
      <li class="item" v-if="currentTrack">
        <div>
          <strong>{{currentTrack}}</strong>
        </div>
      </li>
      <li class="item" v-for="(video, i) in playlist" :key="video.i">
        <div>
          <span>{{video.title}}</span>
        </div>
        <div>
          <button @click="remove(i)">&#10005;</button>
        </div>
      </li>
      <li class="empty" v-if="playlist.length === 0">
        <strong>Empty queue</strong>
      </li>
      <li class="item" v-if="loading">
        <div>
          <strong>Loading...</strong>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { playlistAttributes } from '~/assets/js/playlistAttributes'
  import {EventBus} from '~/assets/js/websocketEventBus'

  export default {
    mixins: [playlistAttributes],
    methods: {
      remove (index) {
        EventBus.$emit('remove', index)
      }
    },
    computed: {
      currentTrack () {
        return this.$store.state.sinusbot.currentTrack
      },
      loading () {
        return this.$store.state.sinusbot.loading
      }
    }
  }
</script>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    margin-bottom: 1rem;
  }

  .item {
    background-color: white;
    color: black;
    box-shadow: 1px 1px 5px 1px rgba(black, 0.1);
    padding: 1rem;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
  }

  .empty {
    box-shadow: 1px 1px 5px 1px rgba(black, 0.1);
    padding: 1rem;
    margin-bottom: 12px;
    text-align: center;
  }
</style>
