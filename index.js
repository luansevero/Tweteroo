import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios =[];
const tweets = [];

function simpleValidation(req){
    if((typeof req.body == "object") && req.username !== ""){
       return false
    }
    return true
}

app.post("/sign-up", (req, res) => {
    if(simpleValidation(req.body) && req.body.avatar !== ""){
        res.sendStatus(400)
    };
    usuarios.push(req.body);
    res.status(201).send(`"OK"`)
});

app.post("/tweets", (req, res) => {
    if(simpleValidation(req.body) && req.body.tweet !== ""){
        res.sendStatus(400)
    };
    const tweetAvatar = usuarios[usuarios.length - 1].avatar
    tweets.push({
        username: req.body.username,
        tweet: req.body.tweet,
        avatar: tweetAvatar
    });
    res.status(201).send(`"OK"`)
});

app.get("/tweets", (req, res) => {
    let showTen = tweets;
    if(tweets.length > 10){
        showTen = showTen.slice((showTen.length - 10), showTen.length);
    }
    console.log(tweets)
    res.send(showTen.slice().reverse())//O Slice é para fazer uma "cópia" do array original e depois reverter para não alterar a array original
});

app.get("/tweets/:USERNAME", (req, res) => {
    const loggedUser =  req.params.USERNAME;
    const userTweets = tweets.filter(tweet => {
        if(tweet.username === loggedUser){
            return tweet
        }
    })
    res.send(userTweets)
});

app.listen(5000);