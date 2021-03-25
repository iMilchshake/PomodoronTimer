import {createStore} from 'vuex'
import settings from '../assets/settings';
import {addFinishObject} from "@/assets/logger";

export default createStore({
    state: {
        t_left: settings.t_pomodoro,
        t: settings.t_pomodoro, // <- read this for output
        t_goal: settings.t_pomodoro,
        t_0: 0,
        active: false,
        timeoutObject: null,
        updateLoopActive: false,
        n_pomodoro: 0,
        phase: 'pomodoro',
        date_start: null,
    },
    mutations: {
        reduceTimeLeft(state, t_elapsed) {
            state.t_left -= t_elapsed;
        },
        start(state) {
            state.active = true;
            state.t_0 = performance.now()

            if(state.date_start === null) {
                state.date_start = new Date(); // save start time/date when first started
            }
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
            state.date_start = null;
        },
        addTime(state, t) {
          state.t_left += t;
          state.t += t;
          state.t_goal += t;
        },
        finish(state) {
            // save here!
            addFinishObject({
                t_start: state.date_start,
                t_elapsed: state.t_goal,
                phase: state.phase
            });

            // reset variables
            state.active = false;
            state.timeoutObject = null;
            state.date_start = null;

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
            if (context.state.active === false && context.state.timeoutObject === null) {
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
        },
        addTime(context, time) {
            const active_before = this.state.active;
            context.dispatch('stopTimer');
            context.commit('addTime', time);

            if(active_before) {
                context.dispatch('startTimer');
            }
        }
    },
    modules: {}
})
