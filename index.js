import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios =[];
const tweets = [];

function simpleValidation(req){
    if((typeof req == "object") && req.username !== ""){
       return false
    }
    return true
}

app.post("/sign-up", (req, res) => {
    if(simpleValidation(req.body) || req.body.avatar !== ""){
        res.sendStatus(400)
    };
    
    usuarios.push(req.body);
    res.status(201).send(`"OK"`)
});

app.post("/tweets", (req, res) => {
    if(simpleValidation(req.body) || req.body.tweet !== ""){
        res.sendStatus(400)
    };
    const tweetAvatar = usuarios[usuarios.length - 1].avatar
    tweets.push({
        username: req.headers.user,
        tweet: req.body.tweet,
        avatar: tweetAvatar
    });
    res.status(201).send(`"OK"`)
});

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page) //Ok
    console.log(page)
    console.log(page * 10 > tweets.length + 10)
    if(page < 1 || ((page > 1) && page * 10 >= tweets.length + 10)){
        res.status(400)
    } 
    let tenTweets = tweets;
    if(tenTweets.length > 10){
        function lastTen(page){
            let first = tweets.length - (page * 10)
            let last = tweets.length - ((page - 1) * 10)
            if(first < 0){
                first = 0;
            }
            if(last < 0){
                last = 0;
            }
            return({
                first: first,
                last: last,
            })
        }
        const renderLimiter = lastTen(page);
        tenTweets = tenTweets.slice(renderLimiter.first, renderLimiter.last);
        console.log(tenTweets)
    }  
    res.send(tenTweets.slice().reverse())//O Slice é para fazer uma "cópia" do array original e depois reverter para não alterar a array original
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