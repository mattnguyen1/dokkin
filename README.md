# dokk.in

Making a full-featured and user friendly Dokkan webapp.

## Local Development

### Prerequisites:

  - Erlang 20
  - Elixir 1.6.1
    - https://elixir-lang.org/install.html
  - Node 8
    - https://nodejs.org/en/download/package-manager/
  - (opt) SQLite browser
    - http://sqlitebrowser.org/

### Starting the Phoenix web server

  - Install dependencies with `mix deps.get`
  - Install static dependencies with `cd static && npm install`
  - Start Phoenix server with `mix dev`. This will start your webpack-dev-server and start watching it. By default, the webpack-dev-server runs on port 8080.
  - Optionally, you can start the server with `iex -S mix dev` in order to run the server while in the REPL.

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Production Deployment

- To build assets and place them in the folder that serves static content: `mix prod.build`
- To build assets and run the app backgrounded as a daemon on port `4001`: `mix prod.start`

## In Progress

- Quick search: auto complete in the search input similar to the autocomplete results in twitch
  - This should also include links and categories as possible results

