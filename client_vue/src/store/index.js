import {createStore} from 'vuex'
import settings from '../assets/settings';

export default createStore({
    state: {
        t_left: settings.t_pomodoro,
        t: settings.t_pomodoro, // <- read this for output
        t_0: 0,
        t_goal: settings.t_pomodoro,
        n_pomodoro: 0, // <-
        phase: 'pomodoro',
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
            state.t_goal = t;
            state.finished = false;
        },
        finish(state) {
            // reset variables
            state.active = false;
            state.timeoutObject = null;

            // pomodoro cycle logic
            if(state.phase === 'pomodoro') {
                state.n_pomodoro += 1
                if(state.n_pomodoro === settings.n_loops) {
                    state.n_pomodoro = 0;
                    state.phase = 'long';
                    this.commit('setupTimer', settings.t_long)
                } else {
                    state.phase = 'short';
                    this.commit('setupTimer', settings.t_short)
                }
            } else {
                state.phase = 'pomodoro';
                this.commit('setupTimer', settings.t_pomodoro);
            }

            console.log("loops: ", state.n_pomodoro, "phase: ", state.phase);

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
            }, 37);
        },
        setupTimer(context, time) {
            context.commit('setupTimer', time);
        }
    },
    modules: {}
})
