require('dotenv').config()
const http = require('http');
const url = require('url');
const express = require("express");
const { TwitterApi } = require('twitter-api-v2');
const PORT = process.env.PORT || 3001;
const app = express();

const config = {
  headers: {
    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  }
}
//app.use(express.static(path.join(__dirname, 'build')));

const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

app.get("/api", async (req, res) => {
  res.json({ message: "Hello from Express"});
});

app.get("/api/twitterCounts", async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    const setDate = req.query.date + "T00:00:00Z"

    const twitterQuery = '(' + req.query.name + ') (bullpen OR warming OR "getting loose" OR stretching OR "started throwing" OR "done for the day" OR pitches OR "pitch count") is:verified'

    const response = await appOnlyClient.v2.tweetCountRecent(twitterQuery, {start_time: setDate})

    const resp = response.meta.total_tweet_count.toString() + req.query.date + req.query.name
    res.json({ message: resp, data: response.data});
  } catch (e) {
    console.log(e)
    res.json({ message: "Hello from Express"});
  }
  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});