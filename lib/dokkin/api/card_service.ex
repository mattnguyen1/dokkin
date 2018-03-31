defmodule Dokkin.API.CardService do
  @moduledoc """
  The Card Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.Card
  alias Dokkin.LeaderSkill
  alias Dokkin.LinkSkills
  alias Dokkin.Categories
  @no_card_unique_id 9999

  @doc """
  Get cards that match the given name
  """
  @spec get_cards(String.t) :: list

  def get_cards(name) do
    get_cards_from_cache(name)
  end

  @doc """
  Get cards matching all the given ids
  """
  @spec get_cards_by_id(list) :: list

  def get_cards_by_id(ids) do
    Benchmark.measure("Dokkin.API.CardService.get_cards_by_id()", fn ->
      do_get_cards_by_id(ids)
    end)
  end

  @doc """
  Get a single card matching the given id
  """
  @spec get_card_by_id(integer) :: Card.t

  def get_card_by_id(id) do
    List.first(do_get_cards_by_id([id]))
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
    |> search_index_query()
    |> Repo.all()
  end

  @spec base_card_query(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp base_card_query(query) do
    query
    |> card_exists()
    |> base_card()
    |> is_resource()
    |> with_leader_skill()
    |> order_by_atk()
    |> select_with_leader_skill()
  end

  @spec search_index_query(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp search_index_query(query) do
    query
    |> card_exists()
    |> base_card()
    |> is_resource()
    |> with_text()
    |> order_by_atk()
    |> select_with_all_text()
  end

  @spec has_name(Ecto.Queryable.t, String.t) :: Ecto.Queryable.t
  defp has_name(query, name) do
    query |> where([c], like(c.name, ^name))
  end

  defp has_ids(query, ids) do
    query |> where([c], c.id in ^ids)
  end

  @spec order_by_atk(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp order_by_atk(query) do
    query |> order_by([c], [desc: c.atk_max])
  end

  @spec select_with_all_text(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_with_all_text(query) do
    from [c, ls, link1, link2, link3, link4, link5, link6, link7,
          cat1, cat2, cat3, cat4, cat5, cat6] in query,
    select: %{
      card: c,
      leader_skill: ls.name,
      link1: link1.name,
      link2: link2.name,
      link3: link3.name,
      link4: link4.name,
      link5: link5.name,
      link6: link6.name,
      link7: link7.name,
      cat1: cat1.name,
      cat2: cat2.name,
      cat3: cat3.name,
      cat4: cat4.name,
      cat5: cat5.name,
      cat6: cat6.name
    }
  end

  @spec select_with_leader_skill(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_with_leader_skill(query) do
    from [c, ls] in query,
    select: %{
      card: c,
      leader_skill: ls.name
    }
  end

  @spec with_text(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp with_text(query) do
    from c in query,
    left_join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    left_join: link1 in LinkSkills, on: c.link_skill1_id == link1.id,
    left_join: link2 in LinkSkills, on: c.link_skill2_id == link2.id,
    left_join: link3 in LinkSkills, on: c.link_skill3_id == link3.id,
    left_join: link4 in LinkSkills, on: c.link_skill4_id == link4.id,
    left_join: link5 in LinkSkills, on: c.link_skill5_id == link5.id,
    left_join: link6 in LinkSkills, on: c.link_skill6_id == link6.id,
    left_join: link7 in LinkSkills, on: c.link_skill7_id == link7.id,
    left_join: cat1 in Categories, on: c.card_category1_id == cat1.id,
    left_join: cat2 in Categories, on: c.card_category2_id == cat2.id,
    left_join: cat3 in Categories, on: c.card_category3_id == cat3.id,
    left_join: cat4 in Categories, on: c.card_category4_id == cat4.id,
    left_join: cat5 in Categories, on: c.card_category5_id == cat5.id,
    left_join: cat6 in Categories, on: c.card_category6_id == cat6.id
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
