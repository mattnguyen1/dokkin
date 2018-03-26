defmodule Mix.Tasks.BuildAssets do
  use Mix.Task

  @shortdoc "Build static assets"
  def run(_) do
    Mix.shell.cmd("cd static && npm run build && cd ..")
  end
end
