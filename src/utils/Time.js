class Time {
    diffInSeconds(date) {
        return Math.floor((new Date().getTime() - date.getTime()) / 1000)
    }
}

module.exports = new Time()
