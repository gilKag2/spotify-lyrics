require('dotenv').config();
const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const credentials = {
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
};

app.post('/login', (req, res) => {
    const code = req.body.code;

    const spotifyApi = new spotifyWebApi(credentials);
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    }).catch((err) => { console.log(err); res.sendStatus(400); });
});

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const refreshCredentials = { ...credentials, refreshToken };
    const spotifyApi = new spotifyWebApi(refreshCredentials);
    spotifyApi.refreshAccessToken().then(
        data => {
            const { accessToken, expiresIn } = data;
            res.json({ accessToken, expiresIn });
        }
    ).catch((err) => { console.log(err); res.sendStatus(400); });
});

app.get('/lyrics', async (req, res) => {
    const { track, artist } = req.query;
    const lyrics = await lyricsFinder(artist, track) || "No lyrics found";
    res.json({ lyrics });
});

app.listen(3001, () => console.log("app is listening on port 3001"));