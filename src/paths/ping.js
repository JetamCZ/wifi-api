const jokes = require("../consts/jokes.json")
const random = require("../utils/Random")

module.exports = {
    get: (req, res) => {
        const programingJokes = jokes.filter(joke => joke.type === "programming")
        const joke = programingJokes[random.randomIntFromInterval(0, programingJokes.length -1)]

        res.send({
            time: new Date().getTime(),
            randomJoke: joke.setup+" - "+joke.punchline
        })
    }
}
