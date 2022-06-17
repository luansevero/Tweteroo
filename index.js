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
    if(tweets.length > 10){
        const lastTen = tweets.splice((tweets.length - 10), 10);
        res.send(lastTen)
    }
    res.send(tweet)
});

app.get("/tweets", (req, res) => {

});

app.listen(5000);