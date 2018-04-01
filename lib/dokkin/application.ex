defmodule Dokkin.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Dokkin.Repo, []),
      # Start the endpoint when the application starts
      supervisor(DokkinWeb.Endpoint, []),
      worker(Cachex, [:cards_cache, []], id: :cards_cache),
      worker(Cachex, [:search_cache, []], id: :search_cache),
      worker(Dokkin.API.SearchService.Supervisor, [])
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Dokkin.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    DokkinWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
