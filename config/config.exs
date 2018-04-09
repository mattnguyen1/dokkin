# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :dokkin,
  ecto_repos: [Dokkin.Repo]

# Configures the endpoint
config :dokkin, DokkinWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NA4qXdV46yNWBUv8fsUNSagNkDDT4SVkvXwPUITuYRl6KO0thqT/HSqu1OaAiz3u",
  render_errors: [view: DokkinWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Dokkin.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
