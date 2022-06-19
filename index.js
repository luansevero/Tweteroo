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
    if(simpleValidation(req.body) && req.body.avatar !== ""){
        res.sendStatus(400)
    };
    
    usuarios.push(req.body);
    console.log(usuarios)
    res.status(201).send(`"OK"`)
});

app.post("/tweets", (req, res) => {
    if(simpleValidation(req.body) && req.body.tweet !== ""){
        res.sendStatus(400)
    };
    const tweetAvatar = usuarios[usuarios.length - 1].avatar
    tweets.push({
        username: req.headers.user,
        tweet: req.body.tweet,
        avatar: tweetAvatar
    });
    console.log(req.body)
    res.status(201).send(`"OK"`)
});

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page) //Ok
    if(page < 1){
        res.status(400)
    } // Validação Ok
    let tenTweets = tweets;
    if(tenTweets.length > 10){
        const first = tweets.length - (page * 10);
        const last = tweets.length - ((page - 1) * 10);
        tenTweets = tenTweets.slice(first, last);
    }
    if(page === 1 || page * 10 < tweets.length + 10){
        res.send(tenTweets.slice().reverse())//O Slice é para fazer uma "cópia" do array original e depois reverter para não alterar a array original
    } //Para não conseguir ficar atualizando!

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