import {EventBus} from '~/assets/js/websocketEventBus'

export const state = () => ({
    state: -1,
    repeat: false,
    index: -1,
})

const buildStateGetters = (associations) => {
    return Object.entries(associations).reduce((carry, [value, key]) => {
        carry[value] = state => state.state === key
        return carry;
    }, {})
}

export const getters = {
    ...buildStateGetters({
        unstarted: -1,
        ended: 0,
        playing: 1,
        paused: 2,
        buffering: 3,
        cued: 5
    })
}

export const mutations = {
    setState(state, {state: s}) {
        state.state = s
    },
    setRepeat(state, {repeat}) {
        state.repeat = repeat
    },
    setIndex(state, { index }) {
        state.index = index
    }
}

export const actions = {
    next () {
      EventBus.$emit('next')
    },
    prev ({state, commit}) {
        if (state.index === 0) {
            // nothing to do
        } else {
            commit('setIndex', {index: state.index - 1})
        }
    }
}
