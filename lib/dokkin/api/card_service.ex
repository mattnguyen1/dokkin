defmodule Dokkin.API.CardService do
  @moduledoc """
  The Card Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.Card
  alias Dokkin.LeaderSkill
  @no_card_unique_id 9999

  @doc """
  Get cards that match the given name
  """
  @spec get_cards(String.t) :: list
  def get_cards(name) do
    get_cards_from_cache(name)
  end

  def get_cards_by_id(ids) do
    do_get_cards_by_id(ids)
  end

  @doc """
  Get all the existing cards
  """
  @spec get_all_cards() :: list
  def get_all_cards() do
    get_all_cards_from_cache()
  end

  @spec get_cards_from_cache(String.t) :: list
  defp get_cards_from_cache(name) do
    Repo.fetch_cards(name, &do_get_cards/1, 1)
  end

  @spec get_all_cards_from_cache() :: list
  defp get_all_cards_from_cache() do
    Repo.fetch_cards("all_cards", &do_get_all_cards/0)
  end

  @spec do_get_cards(String.t) :: list
  defp do_get_cards(name) do
    Card
    |> has_name(name)
    |> base_card_query()
    |> Repo.all()
  end

  defp do_get_cards_by_id(ids) do
    Card
    |> has_ids(ids)
    |> base_card_query()
    |> Repo.all()
  end

  @spec do_get_all_cards() :: list
  def do_get_all_cards() do
    Card
    |> base_card_query()
    |> Repo.all()
  end

  @spec base_card_query(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp base_card_query(query) do
    query
    |> card_exists()
    |> base_card()
    |> is_resource()
    |> with_leader_skill()
    |> select_with_leader_skill()
  end

  @spec has_name(Ecto.Queryable.t, String.t) :: Ecto.Queryable.t
  defp has_name(query, name) do
    query |> where([c], like(c.name, ^name))
  end

  defp has_ids(query, ids) do
    query 
    |> where([c], c.id in ^ids)
  end

  @spec select_with_leader_skill(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_with_leader_skill(query) do
    from [c, ls] in query,
    select: {c, ls.name}
  end

  @spec with_leader_skill(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp with_leader_skill(query) do
    from c in query,
    join: ls in LeaderSkill,
    where: c.leader_skill_id == ls.id
  end

  @spec base_card(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp base_card(query) do
    from c in query,
    where: fragment(
      "? IN (SELECT card_id FROM card_awakening_routes WHERE type != \"CardAwakeningRoute::Dokkan\")", c.id
    )
  end

  @spec is_resource(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp is_resource(query) do
    from c in query,
    where: c.resource_id == c.id or is_nil(c.resource_id)
  end

  @spec card_exists(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp card_exists(query) do
    from c in query,
    where: c.card_unique_info_id != @no_card_unique_id
  end
end
