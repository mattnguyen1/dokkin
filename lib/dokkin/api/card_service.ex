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
  alias Dokkin.AwakeningRoutes
  alias Dokkin.PassiveSkillSet
  alias Dokkin.CardSpecials
  alias Dokkin.Specials
  @no_card_unique_id 9999

  ##############
  ### Client ###
  ##############

  @doc """
  Get cards that match the given name
  """
  @spec get(map) :: list

  def get(%{name: name}) do
    cache_get(name)
  end

  @doc """
  Get a single card matching the given id
  """
  @spec get(map) :: Card.t

  def get(%{id: id}) do
    List.first(do_get([id]))
  end

  @doc """
  Get cards matching all the given ids
  """
  @spec get(list) :: list

  def get(ids) when is_list(ids) do
    Benchmark.measure("Dokkin.API.CardService.get(ids)", fn ->
      do_get(ids)
    end)
  end

  @doc """
  Get all the existing cards
  """
  @spec get_all() :: list

  def get_all() do
    cache_get_all()
  end

  @spec cache_get(String.t) :: list
  defp cache_get(name) do
    Repo.fetch_cards(name, &do_get/1, 1)
  end

  @spec cache_get_all() :: list
  defp cache_get_all() do
    Repo.fetch_cards("all_cards", &do_get_all/0)
  end

  ###############
  ### Queries ###
  ###############

  @spec do_get(String.t) :: list
  defp do_get(name) when is_binary(name) do
    Card
    |> by_name(name)
    |> query_minimal()
    |> Repo.all()
  end

  @spec do_get(list) :: list
  defp do_get(ids) when is_list(ids) do
    Card
    |> by_ids(ids)
    |> query_detailed()
    |> Repo.all()
  end

  @spec do_get_all() :: list
  def do_get_all() do
    Card
    |> query_detailed()
    |> Repo.all()
  end

  @spec query_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp query_minimal(query) do
    query
    |> join_minimal()
    |> by_base_awakening()
    |> order_by_atk()
    |> select_minimal()
  end

  @spec query_detailed(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp query_detailed(query) do
    query
    |> join_all()
    |> by_base_awakening()
    |> order_by_atk()
    |> select_all()
  end

  @spec by_name(Ecto.Queryable.t, String.t) :: Ecto.Queryable.t
  defp by_name(query, name) do
    query |> where([c], like(c.name, ^name))
  end

  @spec by_ids(Ecto.Queryable.t, list) :: Ecto.Queryable.t
  defp by_ids(query, ids) do
    query |> where([c], c.id in ^ids)
  end

  @spec order_by_atk(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp order_by_atk(query) do
    query |> order_by([c], [desc: c.atk_max])
  end

  @spec select_all(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_all(query) do
    from [c, ls, a, cs, s, p, link1, link2, link3, link4, link5, link6, link7,
          cat1, cat2, cat3, cat4, cat5, cat6] in query,
    select: %{
      card: c,
      leader_skill: ls.name,
      leader_skill_description: ls.description,
      super_attack: s.name,
      super_attack_description: s.description,
      passive_description: p.description,
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

  @spec select_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp select_minimal(query) do
    from [c, ls, a] in query,
    select: %{
      card: c,
      leader_skill: ls.name
    }
  end

  @spec join_all(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp join_all(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    join: a in AwakeningRoutes, on: a.card_id == c.id,
    left_join: cs in CardSpecials, on: c.id == cs.card_id,
    left_join: s in Specials, on: s.id == cs.special_id,
    left_join: p in PassiveSkillSet, on: c.passive_skill_set_id == p.id,
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
    left_join: cat6 in Categories, on: c.card_category6_id == cat6.id,
    where: a.type != "CardAwakeningRoute::Dokkan"
  end

  @spec join_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp join_minimal(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    join: a in AwakeningRoutes, on: c.id == a.card_id,
    where: a.type != "CardAwakeningRoute::Dokkan"
  end

  @spec by_base_awakening(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp by_base_awakening(query) do
    from c in query,
    where: c.resource_id == c.id or is_nil(c.resource_id),
    where: c.card_unique_info_id != @no_card_unique_id
  end
end
