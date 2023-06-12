const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'your-consumer-key',
  consumer_secret: 'your-consumer-secret',
  access_token_key: 'your-access-token-key',
  access_token_secret: 'your-access-token-secret'
});

async function deleteAllTweets() {
  const params = { screen_name: 'your-twitter-handle' };
  let data = await client.get('statuses/user_timeline', params);

  for(let tweet of data) {
    await client.post(`statuses/destroy/${tweet.id_str}`, {});
    console.log(`Deleted tweet ${tweet.id_str}`);
  }
}

async function unlikeAllTweets() {
  const params = { screen_name: 'your-twitter-handle', count: 200 };
  let data = await client.get('favorites/list', params);

  for(let tweet of data) {
    await client.post(`favorites/destroy`, { id: tweet.id_str });
    console.log(`Unliked tweet ${tweet.id_str}`);
  }
}

async function unretweetAllTweets() {
  const params = { screen_name: 'your-twitter-handle', count: 200 };
  let data = await client.get('statuses/user_timeline', params);

  for(let tweet of data) {
    if(tweet.retweeted) {
      await client.post(`statuses/unretweet/${tweet.id_str}`, {});
      console.log(`Unretweeted tweet ${tweet.id_str}`);
    }
  }
}

async function main() {
  await deleteAllTweets();
  await unlikeAllTweets();
  await unretweetAllTweets();
  console.log("All done!");
}

main().catch(console.error);
