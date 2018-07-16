import axios from 'axios'

export const state = () => ({
  instanceId: null,
  token: null,
  botId: null,
  instances: [],
  queue: [],
  currentTrack: '',
  loading: false
})

export const mutations =  {
  setBotId (state, botId) {
    state.botId = botId
  },
  setToken (state, token) {
    state.token = token
  },
  setInstanceId (state, instanceId) {
    state.instanceId = instanceId
  },
  setInstances (state, instances) {
    state.instances = instances
  },
  setQueue (state, queue) {
    state.queue = queue
  },
  setCurrentTrack (state, currentTrack) {
    state.currentTrack = currentTrack.title
  },
  startLoading (state) {
    console.log('[LOADING] assign true')
    state.loading = true
  },
  stopLoading (state) {
    console.log('[LOADING] assign false')
    state.loading = false
  }
}

export const actions = {
  async getInstances ({state, commit}) {
    const {data} = await axios.get('/api/v1/bot/instances', {
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    })
    commit('setInstances', data)
  }
}
