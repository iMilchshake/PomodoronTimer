import axios from "axios";

const read_url = 'http://localhost:8080/PomodoronTimer/api/data';
const write_url = 'http://localhost:8080/PomodoronTimer/api/add';
const daycount_url = 'http://localhost:8080/PomodoronTimer/api/data/daycount';
const timeSpend_url = 'http://localhost:8080/PomodoronTimer/api/data/timeSpend';
const debug = false;

export const saveTimeObject = async function (t) {
    axios.post(write_url, t).then((r) => {
        if (debug)
            console.log("response: ", r.data);
    }, (error) => {
        console.error(error);
    });
}

export const getTimeObjects = async function () {
    try {
        const times = await axios.get(read_url);
        return times.data;
    } catch (error) {
        console.error(error);
    }
}

export const getDayCount = async function () {
    try {
        const times = await axios.get(daycount_url);
        return times.data;
    } catch (error) {
        console.error(error);
    }
}

export const getTimeSpend = async function () {
    try {
        const timeSpend = await axios.get(timeSpend_url);
        return timeSpend.data;
    } catch (error) {
        console.error(error)
    }
}