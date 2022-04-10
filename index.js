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
    const response = await appOnlyClient.v2.tweetCountRecent("yankees")
    console.log(response.meta.total_tweet_count)
    res.json({ message: response.meta.total_tweet_count});
  } catch (e) {
    console.log(e)
    res.json({ message: "Hello from Express"});
  }
  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});