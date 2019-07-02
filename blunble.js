require("dotenv").config();
var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

async function getSelfId() {
  var response = await client.get("account/verify_credentials", {});
  return response.id_str;
}

async function getMutedUsers(count = 200) {
  var response = await client.get("mutes/users/list", { count: count });
  return response.users;
}

async function doesSourceFollow(source, target) {
  var response = await client.get("friendships/show", {
    source_id: source,
    target_id: target
  });
  return response.relationship.target.followed_by;
}

async function blockUser(id) {
  var response = await client.post("blocks/create", { user_id: id });
}

async function unBlockUser(id) {
  var response = await client.post("blocks/destroy", { user_id: id });
}

async function main() {
  var selfId = await getSelfId();
  var mutedUsers = await getMutedUsers();

  if (!mutedUsers.length) {
    console.log("You have no muted users.");
    return;
  }

  for (i = 0; i < mutedUsers.length; i++) {
    var user = mutedUsers[i];
    console.log(`Checking if user @${user.screen_name} is following you:`);

    if (!(await doesSourceFollow(user.id_str, selfId))) {
      console.log("Nope!");
    } else {
      console.log(`Yes!
      
      Blocking user @${user.screen_name}...
      `);
      await blockUser(user.id_str);

      console.log(`Unblocking user @${user.screen_name}...`);
      await unBlockUser(user.id_str);
    }
  }
}

main();
