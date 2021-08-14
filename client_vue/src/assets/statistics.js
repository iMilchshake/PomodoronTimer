// define statistic objects for ChartJs
exports.dayCountChart = {
    id: 'dayCountChart',
    type: 'doughnut',
    show: false,
    data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                backgroundColor: ['#c8a23f', '#e06231', '#2bba84', '#8164c6', '#7829b0', '#7e7e7e', '#2d2d2d'],
                data: [1, 1, 1, 1, 1, 1, 1]
            }
        ]
    }
}

exports.timeSpentChart = {
    id: 'timeSpentChart',
    type: 'doughnut',
    show: false,
    data: {
        labels: ['Pomodoro', 'Short', 'Long'],
        datasets: [
            {
                backgroundColor: ['#c8a23f', '#e06231', '#2bba84'],
                data: [1, 1, 1]
            }
        ]
    }
}
