import express from 'express';
import cors from 'cors';

const app = express();

const user ={
    username: "",
    avatar: ""
}

const tweet ={
    username: "",
    avatar: ""
}

app.post("/sign-up", (req, res) => {

});

app.post("/tweets", (req, res) => {

});

app.get("/tweets", (req, res) => {

});

app.listen(5000);