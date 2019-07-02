# Node.js BLUNBLE BOT

This is a port of [@levelsio](https://twitter.com/levelsio)'s original BLUNBLE BOT. His is written in PHP and can be found in [his gist](https://gist.github.com/levelsio/de3269da8a170cb0d7ca97093612a96c).

## Description

Taken from the original comment description:

> &nbsp;  
> BLUNBLE BOT (by @levelsio)
>
> "Blunble" is Korean internet slang for [BL]ock [UNBL]ock. If you block and unblock somebody on Twitter, they stop following you. It's a polite way of getting rid of trolls without permanently blocking because blocking usually results in more anger and more trolling.
>
> WHAT THIS SCRIPT DOES:
>
> 1. Gets your muted accounts list (max 200 users)
> 2. Checks if they follow you
> 3. Blocks and unblocks (or blunbles) each account (and then waits 2 minutes due to rate limiting)
> 4. Blunbling auto unfollows them from your account
>
> THIS LETS YOU:
>
> 1. Mute trolls on Twitter
> 2. And they'll then automatically stop following you when the script runs
>
> Note:
>
> - This will keep blocking/unblocking your entire mute list every day  
>   &nbsp;

## Requirements & Installation

1. A server running Node.js
2. Rename `.env-template` to `.env`
3. Add your consumer key, consumer secret, user token and user secret from Twitter to `.env`. See how to get these values here: https://themepacific.com/how-to-generate-api-key-consumer-token-access-key-for-twitter-oauth/994/
4. Set it up as a cron that runs daily (or more) like this: `@daily node blunble.js`

**Or run once by running this command from shell (terminal, command prompt):**  
`$ node blunble.js`

## License

_MIT licensed_
