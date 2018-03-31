defmodule Benchmark do
  require Logger

  def measure(name, function) do
    {duration, result} = :timer.tc(function)
    Logger.info "#{name} in #{duration/1000.0}ms"
    result
  end
end