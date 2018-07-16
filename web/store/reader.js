import { HANDLE, MODIFIER } from '~/assets/js/symbols'
import { EventBus } from '~/assets/js/websocketEventBus'

const HistoryElement = function ({input, type, handle, modifier}) {
  return {
    input,
    type,
    handle,
    modifier
  }
}

export const state = () => ({
  history: []
})

export const mutations = {
  addHistory (state, historyElement) {
    state.history.push(historyElement)
  }
}

export const actions = {
  async handleInput ({state, commit, dispatch}, {input, type, modifier = MODIFIER.QUEUE, handle = null}) {
    if (!input) {
      // empty input
    }

    commit('addHistory', new HistoryElement({input, type, handle: HANDLE.YOUTUBE, modifier}))

    if (modifier === MODIFIER.NOW) {
      EventBus.$emit('now', input)
    } else {
      EventBus.$emit('queue', input)
    }

    commit('sinusbot/startLoading', null, {root: true})
  }
}
