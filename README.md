# jackpot-bot

## Description
Shameless [egor5q's bot](https://github.com/egor5q/dickfindopen) rip-off.

### Default commands:
- `/stats`
- `/game`
- `/duel`

## Run

Install [Docker](https://www.docker.com/)  
Copy `.env.example`, rename the copy to `.env`, put your bot token there, then

```bash
$ docker compose up
```

## Local development without Docker

Get [NodeJS](https://nodejs.org/) >= 18.10.0 and [yarn](https://yarnpkg.com/)  
Setup [MongoDB](https://www.mongodb.com/try/download/community)

Install dependencies

```bash
$ yarn install
```

Start the bot

```bash
$ DB_URI=mongodb://... BOT_TOKEN=1234567890:... yarn start
```

### Jackpot? Jackpot!
