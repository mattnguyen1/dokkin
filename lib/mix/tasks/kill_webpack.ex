defmodule Mix.Tasks.KillWebpack do
  use Mix.Task

  @shortdoc "Kills webpack process"
  def run(_) do
    Mix.shell.cmd("kill $(ps aux | grep '[w]ebpack' | awk '{print $2}')")
  end
end
