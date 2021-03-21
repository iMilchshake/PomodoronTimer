/*
    times:
        t_pomodoro: time interval pomodoro
        t_short: time interval short breaks
        t_long: time interval long breaks

    other:
        n_loops: how many times t_pomodoro and t_short will be looped until a t_long break
 */

export const deploy_settings = {
    t_pomodoro: 1500,
    t_short: 500,
    t_long: 900,
    n_loops: 3
}

export const debug_settings = {
    t_pomodoro: 15,
    t_short: 5,
    t_long: 9,
    n_loops: 2
}