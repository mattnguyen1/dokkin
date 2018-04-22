defmodule Dokkin.Repo do
  use Ecto.Repo, otp_app: :dokkin, adapter: Sqlite.Ecto2

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.
  """
  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  end

  @doc """
  Fetch cards from cache, or get from db
  and insert into cache if it misses.
  """
  @spec fetch_cards(String.t, fun) :: list

  def fetch_cards(slug, fetch_fn) do
    fetch(slug, :cards_cache, fetch_fn)
  end

  @doc """
  Fetch cards from cache with the slug passed into
  the fetch function, or get from db and insert
  into the cache if it misses.
  """
  @spec fetch_cards(String.t, fun, integer) :: list

  def fetch_cards(slug, fetch_fn, 1) do
    fetch(slug, :cards_cache, fetch_fn, 1)
  end

  @doc """
  Fetch cards from cache with the slug passed into
  the fetch function, or get from db and insert
  into the cache if it misses.
  """
  @spec fetch_cards(String.t, String.t, fun, integer) :: list

  def fetch_cards(prefix, slug, fetch_fn, 1) do
    fetch(prefix, slug, :cards_cache, fetch_fn, 1)
  end

  @doc """
  Fetch cards from the search cache with the slug query
  passed into the fetch function, or get from db and insert
  into the cache if it misses.
  """
  @spec fetch_search(map, fun, integer) :: list

  def fetch_search(params, fetch_fn, 1) do
    fetch(params, :search_cache, fetch_fn, 1)
  end

  @doc """
  Fetch cards from the search cache with the slug query
  passed into the fetch function, or get from db and insert
  into the cache if it misses. Chunks the results by
  an offset, and takes at most a limit amount of results.
  """
  @spec fetch_search(map, integer, integer, fun) :: list

  def fetch_search(params, limit, offset, fetch_fn) do
    fetch(params, limit, offset, :search_cache, fetch_fn)
  end

  @spec fetch(String.t, atom, fun, integer) :: list
  defp fetch(slug, cache, fetch_fn, 1) do
    Cachex.fetch(cache, String.downcase(slug), fn(slug) ->
      fetch_fn.(slug)
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end

  @spec fetch(String.t, String.t, atom, fun, integer) :: list
  defp fetch(prefix, slug, cache, fetch_fn, 1) do
    Cachex.fetch(cache, String.downcase(prefix <> slug), fn(some_slug) ->
      fetch_fn.(slug)
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end

  @spec fetch(String.t, atom, fun) :: list 
  defp fetch(slug, cache, fetch_fn) do
    Cachex.fetch(cache, String.downcase(slug), fn(slug) ->
      fetch_fn.()
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end

  @spec fetch(map, integer, integer, atom, fun) :: list 
  defp fetch(params, limit, offset, cache, fetch_fn) when is_map(params) do
    cache_slug = map_to_slug(params) <> "-" <> Integer.to_string(limit) <> "-" <> Integer.to_string(offset)
    |> String.downcase()
    Cachex.fetch(cache, cache_slug, fn(some_slug) ->
      fetch_fn.(params, limit, offset)
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end

  defp map_to_slug(map) do
    # @TODO: Optimize map_to_slug to enforce certain ordering to prevent cache misses
    map
    |> Map.to_list()
    |> Enum.map(&tuple_to_string/1)
    |> Enum.join("-")
  end
  
  defp tuple_to_string({key, value}) do
    key <> ":" <> value
  end
end
