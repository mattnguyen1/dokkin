defmodule Dokkin.API.SearchService.Supervisor do
  use Supervisor

  def start_link do
      Supervisor.start_link(__MODULE__, [])
  end

  def init([]) do
      pool_options = [
        name: {:local, :search_worker},
        worker_module: Dokkin.API.SearchService,
        size: 5,
        max_overflow: 2
      ]
      children = [
          :poolboy.child_spec(:search_worker, pool_options, [])
      ]

      supervise(children, strategy: :one_for_one)
  end
end