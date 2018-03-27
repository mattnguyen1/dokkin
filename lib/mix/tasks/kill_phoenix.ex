defmodule Mix.Tasks.KillPhoenix do
  use Mix.Task

  @shortdoc "Kills phoenix process"
  def run(_) do
    Mix.shell.cmd("kill $(ps aux | grep '[p]hx.server' | awk '{print $2}')")
  end
end
