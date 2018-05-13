defmodule Dokkin.API.LinkService do
  @moduledoc """
  The Link Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.LinkSkills

  ##############
  ### Client ###
  ##############

  @doc """
  Gets link given the id
  """
  @spec get(String.t) :: String.t

  def get(id) when is_binary(id) do
    cache_get(id)
    |> List.first()
  end

  ####################
  ### Cache Client ###
  ####################

  @spec cache_get(String.t) :: list
  defp cache_get(id) do
    Repo.fetch_cards("link-", id, &do_get/1, 1)
  end

  ###############
  ### Queries ###
  ###############

  @spec do_get(String.t) :: String.t
  defp do_get(id) when is_binary(id) do
    LinkSkills
    |> by_id(id)
    |> Repo.all()
  end

  #####################
  ### Query Helpers ###
  #####################

  @spec by_id(Ecto.Queryable.t, String.t) :: Ecto.Queryable.t
  defp by_id(query, id) do
    query |> where([ls], ls.id == ^id)
  end

  @spec select_all(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_all(query) do
    from ls in query,
    select: %{
      name: ls.name,
      description: ls.description
    }
  end
end
