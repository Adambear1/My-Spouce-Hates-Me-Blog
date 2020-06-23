const mongojs = require("mongojs")

const databaseUrl = "myspousehatesme"
const _main_collections = ["rants"]
const _favorites_collections = ["favorites"]

const _main_db = mongojs(databaseUrl, _main_collections)
const _favorites_db = mongojs(databaseUrl, _favorites_collections)

_main_db.on("error", error => {
    console.log("DB Error: ", error)
})

module.exports = app => {
    app.post("/api/submit", (req, res) => {
        _main_db.rants.insert(req.body, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.send(response)
            }
        })
    })
    app.post("/api/set_favorite", (req, res) => {
        _favorites_db.favorites.insert(req.body, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.send(response)
            }
        })
    })
    app.get("/api/all", (req, res) => {
        _main_db.rants.find({}, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.json(response)
            }
        })
    })
    app.get("/api/get_favorites", (req, res) => {
        _favorites_db.favorites.find({}, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.json(response)
            }
        })
    })
    app.delete("/api/delete_rant/:id", (req, res) => {
        _main_db.rants.remove({ _id: mongojs.ObjectID(req.params.id) }, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.json(response)
            }
        })
    })
    app.delete("/api/delete_favorite/:id", (req, res) => {
        var id = req.params.id;
        _favorites_db.favorites.remove(id, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.json(response)
            }
        })
    })

}