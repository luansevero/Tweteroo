import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios =[];
const tweets = [];

app.post("/sign-up", (req, res) => {
    usuarios.push(req.body);
    console.log(usuarios)
    res.send(`"OK"`);
});

app.post("/tweets", (req, res) => {
    let tweetAvatar = usuarios[usuarios.length - 1].avatar

    tweets.push({
        username: req.body.username,
        tweet: req.body.tweet,
        avatar: tweetAvatar
    });

    console.log(tweets)
    res.send(`"OK"`)
});

app.get("/tweets", (req, res) => {
    let showTen = tweets
    if(tweets.length > 10){
        showTen = showTen.slice((showTen.length - 10), showTen.length);
    }
    res.send(showTen.reverse())
});

app.listen(5000);