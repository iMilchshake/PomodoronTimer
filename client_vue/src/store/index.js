import {createStore} from 'vuex'


export default createStore({
    state: {
        t_left: 0,
        t: 0, // <- read this for output
        t_0: 0,
        timeoutObject: null,
        updateLoopActive: false,
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
        setupTimer(state, t) {
            state.t_left = t;
            state.t = t;
            state.finished = false;
        },
        finish(state) {
            state.active = false;
            state.finished = true;
            state.t_left = 0;
            state.timeoutObject = null;
        },
        updateShowcaseTime(state) {
            if (state.active) {
                state.t = state.t_left - ((performance.now() - state.t_0) / 1000);
            } else {
                state.t = state.t_left;
            }
        },
        setUpdateLoopState(state, active) {
            state.updateLoopActive = active;
        }
    },
    actions: {
        startTimer(context) {
            if (context.state.active === false && context.state.timeoutObject === null && context.state.finished === false) {
                context.commit('start');
                context.commit('startTimeout');
                context.commit('updateShowcaseTime');
            }
        },
        stopTimer(context) {
            if (context.state.active === true && context.state.timeoutObject !== null) {
                context.commit('clearTimeout');
                context.commit('stop');
                context.commit('reduceTimeLeft', (performance.now() - context.state.t_0) / 1000);
                context.commit('updateShowcaseTime');
            }
        },
        startUpdateLoop(context) {
            if (context.state.updateLoopActive === false) {
                context.commit('setUpdateLoopState');
                context.dispatch('updateLoop');
            }
        },
        updateLoop(context) {
            context.commit('updateShowcaseTime');
            setTimeout(() => {
                context.dispatch('updateLoop');
            }, 100);
        },
        setupTimer(context, time) {
            context.commit('setupTimer', time);
        }
    },
    modules: {}
})
