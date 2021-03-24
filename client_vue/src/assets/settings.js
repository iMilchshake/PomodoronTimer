/*
    times:
        t_pomodoro: time interval pomodoro
        t_short: time interval short breaks
        t_long: time interval long breaks

    other:
        n_loops: how many times t_pomodoro and t_short will be looped until a t_long break
 */

// eslint-disable-next-line no-unused-vars
const deploy_settings = function() {
    return {
        t_pomodoro: 1500,
        t_short: 500,
        t_long: 900,
        n_loops: 3
    }
};

// eslint-disable-next-line no-unused-vars
const test_settings = function() {
    return {
        t_pomodoro: 3,
        t_short: 1,
        t_long: 2,
        n_loops: 3
    }
};


//export default deploy_settings();
export default test_settings();