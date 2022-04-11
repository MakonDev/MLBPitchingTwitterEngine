require('dotenv').config()
const { response } = require('express');
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
  try {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await appOnlyClient.v2.tweetCountRecent("yankees")

    res.json({ message: response.meta.total_tweet_count});
  } catch (e) {
    console.log(e)
    res.json({ message: "Hello from Express"});
  }
  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});