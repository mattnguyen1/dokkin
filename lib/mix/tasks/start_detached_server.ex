defmodule Mix.Tasks.StartDetachedServer do
  use Mix.Task

  @shortdoc "Starts phoenix server in detached mode"
  def run(_) do
    Mix.shell.cmd("MIX_ENV=prod PORT=4001 elixir --detached -S mix phx.server")
  end
end
