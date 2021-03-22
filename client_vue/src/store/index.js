import { createStore } from 'vuex'

export default createStore({
  state: {
    t_left: 10,
    t_0: -1,
    timeoutObject: null,
    active: false,
    finished: false,
  },
  mutations: {
    reduceTimeLeft(state, t_elapsed) {
      state.t_left -= t_elapsed;
    },
    start(state) {
      state.active = true;
      state.t_0 = performance.now()
    },
    stop(state) {
      state.active = false;
    },
    clearTimeout(state) {
      clearTimeout(state.timeoutObject);
      state.timeoutObject = null;
    },
    startTimeout(state) {
      state.timeoutObject = setTimeout(() => {
        this.commit('finish');
      }, state.t_left * 1000)
    },
    finish(state) {
      console.log("finished!");
      state.active = false;
      state.finished = true;
      state.t_left = 0;
      state.timeoutObject = null;
    }
  },
  actions: {
    startTimer(context) {
      if (context.state.active === false && context.state.timeoutObject === null && context.state.finished === false) {
        context.commit('start');
        context.commit('startTimeout');
      }
    },
    stopTimer(context) {
      if (context.state.active === true && context.state.timeoutObject !== null) {
        context.commit('clearTimeout');
        context.commit('stop');
        context.commit('reduceTimeLeft', (performance.now() - context.state.t_0)/1000);
      }
    }
  },
  modules: {
  }
})
