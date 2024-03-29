import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios =[];
const tweets = [];

app.post("/sign-up", (req, res) => {
    if(!typeof req.body == "object" || req.body.username == "" || req.body.avatar == ""){
        res.sendStatus(400)
    } else {
        usuarios.push(req.body);
        res.status(201).send(`"OK"`)
    };
});

app.post("/tweets", (req, res) => {
    if(!typeof req.body == "object" || req.headers.user == "" || req.body.tweet == ""){
        res.sendStatus(400)
    } else {
        const tweetAvatar = usuarios[usuarios.length - 1].avatar
        tweets.push({
            username: req.headers.user,
            tweet: req.body.tweet,
            avatar: tweetAvatar
        });
        res.status(201).send(`"OK"`)
    };

});

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page) //Ok
    if(page < 1 || ((page > 1) && page * 10 >= tweets.length + 10)){
        res.status(400).send(`"Informe uma página válida!"`)
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
    }  
    res.send(tenTweets.slice().reverse())
});

app.get("/tweets/:USERNAME", (req, res) => {
    const loggedUser =  req.params.USERNAME;
    const userTweets = tweets.filter(tweet => {
        if(tweet.username === loggedUser){
            return tweet
        }
    })
    res.send(userTweets.slice().reverse())
});

app.listen(5000);