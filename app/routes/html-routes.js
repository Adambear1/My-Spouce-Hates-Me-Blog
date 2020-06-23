const path = require('path')

module.exports = app => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    app.get("/author", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/author.html"))
    })
    app.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/author.html"))
    })
}