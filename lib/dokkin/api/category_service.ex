defmodule Dokkin.API.CategoryService do
  @moduledoc """
  The Category Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.Categories

  ##############
  ### Client ###
  ##############

  @doc """
  Gets category given the id
  """
  @spec get(String.t) :: String.t

  def get(id) when is_binary(id) do
    cache_get(id)
    |> List.first()
  end

  @doc """
  Gets all categories that are currently available.
  """

  def get_available() do
    cache_get_available()
  end

  ####################
  ### Cache Client ###
  ####################

  @spec cache_get(String.t) :: list
  defp cache_get(id) do
    Repo.fetch_cards("category-", id, &do_get/1, 1)
  end

  defp cache_get_available() do
    Repo.fetch_cards("category-list", &do_get_available/0)
  end

  ###############
  ### Queries ###
  ###############

  @spec do_get(String.t) :: String.t
  defp do_get(id) when is_binary(id) do
    Categories
    |> by_id(id)
    |> Repo.all()
  end

  @spec do_get_available() :: String.t
  defp do_get_available() do
    Categories
    |> before_datetime(DateTime.utc())
    |> Repo.all()
  end

  #####################
  ### Query Helpers ###
  #####################

  @spec by_id(Ecto.Queryable.t, String.t) :: Ecto.Queryable.t
  defp by_id(query, id) do
    query |> where([c], c.id == ^id)
  end

  @spec before_datetime(Ecto.Queryable.t, NaiveDateTime.t) :: Ecto.Queryable.t
  defp before_datetime(query, datetime) do
    query |> where([c], c.open_at < ^datetime)
  end

  @spec select_all(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_all(query) do
    from cat in query,
    select: %{
      name: cat.name,
      open_at: cat.open_at
    }
  end

end
