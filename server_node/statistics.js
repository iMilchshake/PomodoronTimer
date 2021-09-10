const storage = require('./storage_cached')

exports.daycount = async function () {
    return storage.get().then(data => {
        data = data.map(timeObj => {
            return (new Date(timeObj.start).getDay());
        })

        let counts = {
            "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "0": 0
        };

        data.forEach((el) => {
            counts[el] = counts[el] ? (counts[el] += 1) : 1;
        });

        return Object.values(counts);
    })
};

exports.timeSpend = async function () {
    return storage.get().then(data => {
        let pomodoro = 0, short = 0, long = 0;

        data.forEach(timeObject => {  // TODO: fix warning
            switch (timeObject.phase) {
                case "pomodoro":
                    pomodoro += timeObject.time_goal - timeObject.time_left;
                    break;
                case "short":
                    short += timeObject.time_goal - timeObject.time_left;
                    break;
                case "long":
                    long += timeObject.time_goal - timeObject.time_left;
                    break
                default:
                    console.error("invalid Phase: \n" + timeObject)
            }
        });

        return {
            pomodoro: pomodoro,
            short: short,
            long: long
        };
    })
}



// setTimeout(() => {
//     exports.timeSpend().then(r => {
//         console.log(r);
//     });
// }, 100);