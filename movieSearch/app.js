const express = require("express");
const app = express();
const axios = require('axios');
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());

let movies = [];

// app.post("/", (req, res) => {
//     let searchStr = req.body.searchStr;
//     getMovies(searchStr).then(() => {
//         res.redirect("/");
//     });
// });

app.get("/", (req, res) => {
    let searchStr = req.query.searchStr;
    if (searchStr) {
        getMovies(searchStr).then(() => {
            res.render("index", {movies: movies});
        });
    } else {
        res.render("index", {movies: movies});
    }
});

async function getMovies(searchStr) {
    let url = 'http://www.omdbapi.com/?s='+ searchStr +'&apikey=thewdb';
    await axios.get(url)
        .then((res) => {
            movies = res.data.Search;
        })
        .catch((err) => {
            console.log("error! can not request omdb api")
        });
}

app.listen("916", () => {
    console.log("server start on port 916");
})