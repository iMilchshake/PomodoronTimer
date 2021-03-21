import { createStore } from 'vuex'

export default createStore({
  state: {
    time: 71,
    timeoutObject: null,
    active: false
  },
  mutations: {
    countDown(state) {
      state.time -= 1;
    },
    start(state) {
      state.active = true;
    },
    stop(state) {
      state.active = false;
    },
    clearTimeout(state) {
      state.timeoutObject = null;
      clearTimeout(state.timeoutObject);
    }
  },
  actions: {
    countDownLoop(context) {
        this.state.timeoutObject = setTimeout(() => {
          if (context.state.active && context.state.time > 0) {
            context.commit('countDown');
            context.dispatch('countDownLoop');
          }
        }, 1000)
    },
    startTimer(context) {
      if (context.state.active === false && context.state.timeoutObject === null) {
        context.commit('start');
        context.dispatch('countDownLoop')
      }
    },
    stopTimer(context) {
      if (context.state.active === true && context.state.timeoutObject !== null) {
        context.commit('clearTimeout');
        context.commit('stop');
      }
    }
  },
  modules: {
  }
})
