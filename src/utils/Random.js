class Random {
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomString(length, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        let result = ""
        const charactersLength = chars.length

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charactersLength))
        }

        return result
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }
}

module.exports = new Random()
