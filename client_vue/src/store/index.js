import {createStore} from 'vuex'
import {saveTimeObject} from "@/assets/backend_request";

const getCurrentTime = () => {
    return performance.now();
}

let ding = new Audio("ding.wav");

export default createStore({
    state: {
        colorScheme: {
            name: "default",
            scheme: {
                neutral1: {
                    backgroundColor: "#FFFFFF"
                },
                highlight1: {
                    backgroundColor: "#FFFFFF",
                    color: "#FFFFFF"
                },
                background: {
                    backgroundColor: "#FFFFFF"
                }
            }
        },
        settings: {
            t_pomodoro: process.env.VUE_APP_T_POMODORO,
            t_short: process.env.VUE_APP_T_SHORT,
            t_long: process.env.VUE_APP_T_LONG,
            n_loops: process.env.VUE_APP_N_LOOPS
        },
        t_left: 0,
        t: 0, // <- read this for output TODO: this whole logic should be encapsulated inside an external script :)
        t_goal: 0,
        t_0: 0,
        active: false,
        timeoutObject: null,
        updateLoopActive: false,
        n_pomodoro: 0,
        phase: 'pomodoro',
        date_start: null,
    },
    mutations: {
        changeColor(state, newColorScheme) {
            state.colorScheme = newColorScheme;
        },
        reduceTimeLeft(state, t_elapsed) {
            state.t_left -= t_elapsed;
        },
        start(state) {
            state.active = true;
            state.t_0 = getCurrentTime();

            if (state.date_start === null) {
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
                this.dispatch('finish');
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
            // reset variables
            state.active = false;
            state.timeoutObject = null;
            state.date_start = null;

            // pomodoro cycle logic
            if (state.phase === 'pomodoro') {
                state.n_pomodoro += 1
                if (state.n_pomodoro === state.settings.n_loops) {
                    state.n_pomodoro = 0;
                    state.phase = 'long';
                    this.commit('setupTimer', state.settings.t_long)
                } else {
                    state.phase = 'short';
                    this.commit('setupTimer', state.settings.t_short)
                }
            } else {
                state.phase = 'pomodoro';
                this.commit('setupTimer', state.settings.t_pomodoro);
            }

            console.log("loops: ", state.n_pomodoro, "phase: ", state.phase);

        },
        updateShowcaseTime(state) {
            if (state.active) {
                state.t = state.t_left - ((getCurrentTime() - state.t_0) / 1000);
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
                context.commit('reduceTimeLeft', (getCurrentTime() - context.state.t_0) / 1000);
                context.commit('updateShowcaseTime');
            }
        },
        startUpdateLoop(context) {
            if (context.state.updateLoopActive === false) {
                context.commit('setUpdateLoopState');
                context.dispatch('updateLoop').then(() => {
                    console.log("update loop was started")
                });
            }
        },
        updateLoop(context) {
            context.commit('updateShowcaseTime');
            setTimeout(() => {
                context.dispatch('updateLoop').then();
            }, 100);
        },
        setupTimer(context, time) {
            context.commit('setupTimer', time);
        },
        addTime(context, time) {
            const active_before = this.state.active;
            context.dispatch('stopTimer').then(() => {
                context.commit('addTime', time);

                if (active_before) {
                    context.dispatch('startTimer').then();
                }
            });
        },
        finish(context) {
            // save current timeObject
            context.dispatch('saveCurrentTime').then(() => {
                // setup vuex-state for next timer
                context.commit('finish');
                // play sound
                ding.play().then()
            });


        },
        skipPhase(context) {

            // check if timer was ever ran
            const timerRan = (context.state.date_start !== null)

            // disable phase
            context.dispatch('stopTimer').then(() => {

                // skip phase
                if (timerRan) {
                    console.log("saving and skipping")
                    context.dispatch('saveCurrentTime').then(() => {
                        context.commit('finish');
                    });
                } else {
                    console.log("skipping (without saving!)")
                    context.commit('finish');
                }

            });


        },
        saveCurrentTime(context) {
            // use t=0 if t is close to zero
            const timeLeft = Math.abs(context.state.t) < 0.1 ? 0 : context.state.t;

            // save current timeObject
            saveTimeObject({
                start: context.state.date_start,
                end: new Date(),
                time_goal: context.state.t_goal,
                time_left: timeLeft,
                phase: context.state.phase
            }).then(() => {
                console.log("current time was saved")
            });
        }
    },
    modules: {}
})