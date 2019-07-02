require("./config");

const Twitter = require("twitter");
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

async function getSelfId() {
  const response = await client.get("account/verify_credentials", {});
  return response.id_str;
}

async function getMutedUsers(count = 200) {
  const { users } = await client.get("mutes/users/list", { count: count });
  return users;
}

async function doesSourceFollow(source, target) {
  const response = await client.get("friendships/show", {
    source_id: source,
    target_id: target
  });
  return response.relationship.target.followed_by;
}

async function blockUser(id) {
  await client.post("blocks/create", { user_id: id });
}

async function unBlockUser(id) {
  await client.post("blocks/destroy", { user_id: id });
}

async () => {
  const selfId = await getSelfId();
  const mutedUsers = await getMutedUsers();

  if (!mutedUsers.length) {
    console.log("You have no muted users.");
    return;
  }

  for (i = 0; i < mutedUsers.length; i++) {
    const { screen_name, id_str } = mutedUsers[i];
    console.log(`Checking if user @${screen_name} is following you:`);

    if (!(await doesSourceFollow(id_str, selfId))) {
      console.log("Nope!");
    } else {
      console.log(`Yes!
    
    Blocking user @${screen_name}...
    `);
      await blockUser(id_str);

      console.log(`Unblocking user @${screen_name}...`);
      await unBlockUser(id_str);
    }
  }
};
