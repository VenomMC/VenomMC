# VenomMC
A Discord bot for [VenomMC](https://github.com/VenomMC/VenomMC/releases) made in https://github.com/VenomMC/VenomMC/releases (master branch).

## Setup
To set this bot up for development or self-hosting, you must create a `.env` file in the root directory. This should have the following content:
```
BOT_TOKEN=bot_token_here
PGDATABASE=postgres_database_name_here
PGHOST=postgres_host_name_here
PGPASSWORD=postgres_password_here
PGPORT=postgres_port_here
PGUSER=postgres_user_here
```
Of course, all of the values must be replaced with correct ones.

Next, you must install [https://github.com/VenomMC/VenomMC/releases](https://github.com/VenomMC/VenomMC/releases) version 12. If you have done this already, you can skip this step.

This bot uses Yarn and not NPM, so you should install yarn using `npm install yarn --global` if you haven't already. You'll also need Typescript, so `npm install typescript --global`.

After you've done all of that, you can use `yarn install` to install all of the dependencies. Now, you're ready to make changes! Use a code editor (such as Visual Studio Code or Atom) to start.

Once you've made your changes, you need to run `yarn build` to compile the application to Javascript (the output will be in `./dist`). If you're contributing, please run `yarn lint` and make sure there are no linting errors to keep consistency up!

If you need to run the bot, `yarn start` will do exactly that after you've done the above.
