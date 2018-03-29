defmodule Dokkin.Repo do
  use Ecto.Repo, otp_app: :dokkin, adapter: Sqlite.Ecto2

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.
  """
  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  end

  def fetch_cards(slug, fetch_fn) do
    fetch(slug, :cards_cache, fetch_fn)
  end

  def fetch_cards(slug, fetch_fn, 1) do
    fetch(slug, :cards_cache, fetch_fn, 1)
  end

  def fetch_search(slug, fetch_fn, 1) do
    fetch(slug, :search_cache, fetch_fn, 1)
  end

  defp fetch(slug, cache, fetch_fn, 1) do
    Cachex.fetch(cache, slug, fn(slug) ->
      fetch_fn.(slug)
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end

  defp fetch(slug, cache, fetch_fn) do
    Cachex.fetch(cache, slug, fn(slug) ->
      fetch_fn.()
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end
end
