const mongojs = require("mongojs")

const databaseUrl = "myspousehatesme"
const collections = ["rants"]

const db = mongojs(databaseUrl, collections)

db.on("error", error => {
    console.log("DB Error: ", error)
})

module.exports = app => {
    app.post("/api/submit", (req, res) => {
        db.rants.insert(req.body, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.send(response)
            }
        })
    })
    app.get("/api/all", (req, res) => {
        db.rants.find({}, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.json(response)
            }
        })
    })
}