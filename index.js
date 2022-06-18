import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const loggedUser ={
    username: "",
    avatar: ""
};

const tweet ={
    username: "",
    avatar: ""
};

const tweets = [];

app.post("/sign-up", (req, res) => {
    loggedUser.push(req.body);
    res.send(loggedUser);
});

app.post("/tweets", (req, res) => {
    tweets.push(req.body);
    res.send(`"OK"`)
});

app.get("/tweets", (req, res) => {
    let showTen = tweets
    if(tweets.length > 10){
        showTen = showTen.slice((showTen.length - 10), showTen.length);
    }
    res.send(showTen)
});

app.listen(5000);