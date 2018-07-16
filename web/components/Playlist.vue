<template>
  <div>
    <h2>Songs</h2>
    <ul>
      <li class="item" v-if="currentTrack">
        <strong>{{currentTrack}}</strong>
      </li>
      <li class="item" v-for="(video, i) in playlist" :key="video.i">
        <span>{{video.title}}</span>
        <button @click="remove(i)">&#10005;</button>
      </li>
      <li class="empty" v-if="playlist.length === 0">
        <span>Empty queue</span>
      </li>
      <li class="empty" v-if="loading">
        <span>Loading...</span>
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
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    strong, span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 1rem;
    }
    button {
      padding: 1rem;
      border: none;
      border-left: 1px solid #f5f5f5;
      transition: background-color 100ms;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  .empty {
    box-shadow: 1px 1px 5px 1px rgba(black, 0.1);
    padding: 1rem;
    margin-bottom: 12px;
    text-align: center;
  }
</style>
