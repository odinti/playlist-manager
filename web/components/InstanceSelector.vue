<template>
  <label class="x-instance-selector">
    <span>Instance</span>
    <select v-model="instanceId">
      <option :value="null" disabled>No instance</option>
      <option v-for="({uuid, name, nick}) in instances" :key="uuid" :value="uuid">{{name || nick}}</option>
    </select>
  </label>
</template>

<script>
  import axios from 'axios'
  import { EventBus } from '~/assets/js/websocketEventBus'

  export default {
    name: 'InstanceSelector',
    async mounted () {
      this.$store.commit('sinusbot/setToken', localStorage.getItem('token'))
      this.$store.commit('sinusbot/setBotId', localStorage.getItem('loginBotId'))
      this.$store.commit('sinusbot/setInstanceId', localStorage.getItem('instanceId'))
      await this.$store.dispatch('sinusbot/getInstances')
    },
    watch: {
      async instanceId (id) {
        await this.disconnect()
        if (id) {
          this.connect()
        }
        localStorage.setItem('instanceId', id)
      }
    },
    data () {
      return {
        listeners: [
          ['queue', this.queue],
          ['now', this.now],
          ['next', this.next],
          ['remove', this.remove],
          ['stop', this.stop],
          ['clear', this.clear]
        ]
      }
    },
    computed: {
      botId () {
        return this.$store.state.sinusbot.botId
      },
      instances () {
        return this.$store.state.sinusbot.instances
      },
      instanceId: {
        get () {
          return this.$store.state.sinusbot.instanceId
        },
        set (instanceId) {
          this.$store.commit('sinusbot/setInstanceId', instanceId)
        }
      }
    },
    methods: {
      connect () {
        const proto = (window.location.protocol === 'https:') ? 'wss' : 'ws'
        try {
          this.socket = new WebSocket(proto + "://" + document.location.host + "/api/v1/b/" + this.botId + "/i/" + this.instanceId + "/ws");

          this.socket.addEventListener('close', (e) => {
            //
          })

          this.socket.addEventListener('message', (e) => {
            const data = JSON.parse(e.data);
            switch (data.event) {
              case 'STATE':
                this.$store.commit('sinusbot/setQueue', data.data.queue)
                this.$store.commit('sinusbot/setCurrentTrack', data.data.currentTrack)
                this.$store.commit('sinusbot/stopLoading')
            }
          })

          this.socket.addEventListener('open', (e) => {
            this.addListeners()
          })
        } catch (e) {
          // something broke lol
        }
      },
      addListeners () {
        this.listeners.map(([event, cb]) => {
          EventBus.$on(event, cb)
        })
      },
      removeListeners () {
        this.listeners.map(([event, cb]) => {
          EventBus.$off(event, cb)
        })
      },
      queue (url) {
        this.socket.send(JSON.stringify({
          event: 'QUEUE',
          data: {
            url
          }
        }))
      },
      now (url) {
        this.socket.send(JSON.stringify({
          event: 'NOW',
          data: {
            url
          }
        }))
      },
      next () {
        this.socket.send(JSON.stringify({
          event: 'NEXT',
          data: null
        }))
      },
      stop () {
        this.socket.send(JSON.stringify({
          event: 'STOP',
          data: null
        }))
      },
      clear () {
        this.socket.send(JSON.stringify({
          event: 'CLEAR',
          data: null
        }))
      },
      remove (index) {
        this.socket.send(JSON.stringify({
          event: 'REMOVE',
          data: {
            index
          }
        }))
      },
      async disconnect () {
        return new Promise((resolve, reject) => {
          if (this.socket) {
            this.socket.addEventListener('close', (e) => {
              resolve()
            })
            this.socket.close()
            this.removeListeners()
          } else {
            resolve()
          }
        })
      },
      setError () {
        this.error = true
      }
    }
  }
</script>

<style lang="scss">
  .x-instance-selector {
    display: flex;
    align-items: center;
    label {
      display: flex;
    }
    span {
      margin-right: 1rem;
    }
  }
</style>
