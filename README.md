# Dokkin

## Local Development

### Prerequisites:

This is what I have, so lower versions may or may not be supported.
  - Erlang 20
  - Elixir 1.6.1

### Starting the Phoenix web server

  - Install dependencies with `mix deps.get`
  - Install static dependencies with `cd static && npm install`
  - Start Phoenix server with `mix dev`. This will start your webpack-dev-server and start watching it. By default, the webpack-dev-server runs on port 8080.
  - Optionally, you can start the server with `iex -S mix dev` in order to run the server while in the REPL.

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Production Deployment

Steps are fairly similar to local development, which some minor changes.
  - Install dependencies with `mix deps.get`
  - Install static dependencies with `cd static && npm install`
  - To run the server as a daemon, `MIX_ENV=prod PORT=4001 elixir --detached -S mix phx.server`

## In Progress

- GET `/api/cards`
  - Needs to be queryable by rarity, type/element, name, etc.
- GET `/api/search`
  - This might be pushed off by adding more functionality into `/api/cards` and offloading requests by sending the client some minimal dataset of all the card ids and the associated names/leader skill names.
- All the UI.

