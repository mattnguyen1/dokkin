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
    Benchmark.measure("Dokkin.API.CardService.get(%{id: id})", fn ->
      List.first(cache_get_by_id(id))
    end)
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
  Get cards matching all the given ids from the given
  offse with at most a limit number of cards.
  """
  @spec get(list, integer, integer) :: list

  def get(ids, limit, offset) when is_list(ids) do
    Benchmark.measure("Dokkin.API.CardService.get(ids)", fn ->
      do_get(ids, limit, offset)
    end)
  end

  @doc """
  Get minimal card info matching the given id
  """
  @spec get_minimal(String.t) :: list

  def get_minimal(id) when is_binary(id) do
    Benchmark.measure("Dokkin.API.CardService.get_minimal(id)", fn ->
      cache_get_base_id(id)
      |> cache_get_minimal()
      |> List.first()
    end)
  end

  @doc """
  Get all the existing cards
  """
  @spec get_all() :: list

  def get_all() do
    Benchmark.measure("Dokkin.API.CardService.get_all()", fn ->
      cache_get_all()
    end)
  end

  @doc """
  Gets the dokkan awakening of the given card id
  """
  @spec get_next_dokkan(String.t) :: Card.t

  def get_next_dokkan(id) do
    Benchmark.measure("Dokkin.API.CardService.get_next_dokkan(id)", fn ->
      cache_get_next_dokkan(id)
      |> List.first()
    end)
  end

  @doc """
  Gets the pre-dokkaned card of the given card id
  """
  @spec get_prev_dokkan(String.t) :: Card.t

  def get_prev_dokkan(id) do
    Benchmark.measure("Dokkin.API.CardService.get_prev_dokkan(id)", fn ->
      cache_get_prev_dokkan(id)
      |> List.first()
    end)
  end

  ####################
  ### Cache Client ###
  ####################

  @spec cache_get(String.t) :: list
  defp cache_get(name) do
    Repo.fetch_cards(name, &do_get/1, 1)
  end

  @spec cache_get_by_id(String.t) :: list
  defp cache_get_by_id(id) do
    Repo.fetch_cards(id, &do_get_by_id/1, 1)
  end

  @spec cache_get_minimal(String.t) :: list
  defp cache_get_minimal(id) do
    Repo.fetch_cards("minimal-", id, &do_get_minimal/1, 1)
  end

  @spec cache_get_next_dokkan(String.t) :: list
  defp cache_get_next_dokkan(id) do
    Repo.fetch_cards("next-dokkan-", id, &do_get_next_dokkan/1, 1)
  end

  @spec cache_get_prev_dokkan(String.t) :: list
  defp cache_get_prev_dokkan(id) do
    Repo.fetch_cards("prev-dokkan-", id, &do_get_prev_dokkan/1, 1)
  end

  @spec cache_get_all() :: list
  defp cache_get_all() do
    Repo.fetch_cards("all_cards", &do_get_all/0)
  end

  @spec cache_get_base_id(String.t) :: integer
  defp cache_get_base_id(id) when is_binary(id) do
    Repo.fetch_cards("base-id-", id, &get_base_id/1, 1)
  end

  @spec cache_get_base_id(integer) :: integer
  defp cache_get_base_id(id) when is_integer(id) do
    id = Integer.to_string(id)
    Repo.fetch_cards("base-id-", id, &get_base_id/1, 1)
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
    |> merge_super_attacks()
  end

  @spec do_get(list, integer, integer) :: list
  defp do_get(ids, limit, offset) when is_list(ids) do
    Card
    |> by_ids(ids)
    |> query_detailed()
    |> by_page(limit, offset)
    |> Repo.all()
    |> merge_super_attacks()
  end

  @spec do_get_minimal(String.t) :: list
  defp do_get_minimal(id) do
    Card
    |> query_minimal_by_id(id)
    |> Repo.all()
  end

  @spec do_get_by_id(String.t) :: list
  defp do_get_by_id(id) do
    do_get([id])
  end

  @spec do_get_next_dokkan(String.t) :: list
  defp do_get_next_dokkan(id) do
    # Ensure the id is dokkanable and not z-awakenable
    id = id 
    |> String.to_integer()
    |> (&(Kernel.trunc(&1 / 10) * 10 + 1)).()

    query_next_dokkan(id)
    |> Repo.all()
    |> List.first()
    # If there is no next dokkan, then this will just get cards that
    # have a :nil id, which there are none of, so it will return []
    |> do_get_minimal()
  end

  @spec do_get_prev_dokkan(String.t) :: list
  defp do_get_prev_dokkan(id) do
    query_prev_dokkan(id)
    |> Repo.all()
    |> List.first()
    |> cache_get_base_id()
    |> do_get_minimal()
  end

  @spec get_base_id(String.t) :: String.t
  defp get_base_id(id) when is_binary(id) do
    query_base_id(id)
    |> Repo.all()
    |> List.first()
    |> do_get_base_id(id)
  end

  defp do_get_base_id(:nil, id) do id end
  defp do_get_base_id(base_id, _) do Integer.to_string(base_id) end

  @spec do_get_all() :: list
  defp do_get_all() do
    Card
    |> query_detailed()
    |> order_by_atk()
    |> Repo.all()
    |> merge_super_attacks()
  end

  @spec query_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp query_minimal(query) do
    query
    |> join_minimal()
    |> by_base_awakening()
    |> order_by_atk()
    |> select_minimal()
  end

  @spec query_minimal_by_id(Ecto.Queryable.t, integer) :: Ecto.Queryable.t
  defp query_minimal_by_id(query, id) do
    query
    |> join_minimal()
    |> by_ids([id])
    |> select_minimal()
  end

  @spec query_base_id(String.t) :: Ecto.Queryable.t
  defp query_base_id(id) do
    from a in AwakeningRoutes,
    select: a.card_id,
    where: a.awaked_card_id == ^id,
    where: a.type == "CardAwakeningRoute::Zet"
  end

  @spec query_next_dokkan(integer) :: Ecto.Queryable.t
  defp query_next_dokkan(id) do
    from a in AwakeningRoutes,
    select: a.awaked_card_id,
    where: a.card_id == ^id,
    where: a.type == "CardAwakeningRoute::Dokkan"
  end

  @spec query_prev_dokkan(integer) :: Ecto.Queryable.t
  defp query_prev_dokkan(id) do
    from a in AwakeningRoutes,
    select: a.card_id,
    where: a.awaked_card_id == ^id,
    where: a.type == "CardAwakeningRoute::Dokkan"
  end

  @spec query_detailed(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp query_detailed(query) do
    query
    |> join_all()
    |> by_base_awakening()
    |> order_by_atk()
    |> select_all()
  end

  @spec by_page(Ecto.Queryable.t, integer, integer) :: Ecto.Queryable.t
  defp by_page(query, limit, offset) do
    query
    |> limit(^limit)
    |> offset(^offset)
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
      super_attack: [s.name],
      super_attack_description: [s.description],
      passive_description: p.description,
      link1: link1.name,
      link1_description: link1.description,
      link2: link2.name,
      link2_description: link2.description,
      link3: link3.name,
      link3_description: link3.description,
      link4: link4.name,
      link4_description: link4.description,
      link5: link5.name,
      link5_description: link5.description,
      link6: link6.name,
      link6_description: link6.description,
      link7: link7.name,
      link7_description: link7.description,
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
    from [c, ls, a, p] in query,
    select: %{
      card: c,
      leader_skill: ls.name,
      leader_skill_description: ls.description,
      passive_description: p.description
    }
  end

  @spec join_all(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp join_all(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    left_join: a in AwakeningRoutes, on: a.card_id == c.id,
    join: cs in CardSpecials, on: c.id == cs.card_id,
    left_join: s in Specials, on: c.id == cs.card_id and s.id == cs.special_id,
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
    where: is_nil(a.type) or a.type != "CardAwakeningRoute::Dokkan",
    where: is_nil(a.type) or a.type != "CardAwakeningRoute::Optimal",
    where: (c.rarity >= 4 and fragment("? % 2", c.id) == 1) or (c.rarity < 4 and fragment("? % 2", c.id) == 0),
    where: c.id < 4000000
  end

  @spec join_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp join_minimal(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    left_join: a in AwakeningRoutes, on: c.id == a.card_id,
    left_join: p in PassiveSkillSet, on: c.passive_skill_set_id == p.id,
    where: is_nil(a.type) or a.type != "CardAwakeningRoute::Dokkan",
    where: is_nil(a.type) or a.type != "CardAwakeningRoute::Optimal"
  end

  @spec by_base_awakening(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp by_base_awakening(query) do
    from c in query,
    where: c.card_unique_info_id != @no_card_unique_id
  end

  @spec merge_super_attacks(list) :: list
  defp merge_super_attacks(card_list) do
    card_list
    |> Enum.reverse()
    |> Enum.reduce([], &do_merge_super_attacks/2)
  end

  @spec do_merge_super_attacks(map, list) :: list
  defp do_merge_super_attacks(card, []) do
    [card]
  end

  @spec do_merge_super_attacks(map, list) :: list
  defp do_merge_super_attacks(card, card_list) do
    if List.first(card_list).card.id == card.card.id do
      List.update_at(card_list, 0, fn (card_dupe) ->
        %{card |
          super_attack: card.super_attack ++ card_dupe.super_attack,
          super_attack_description: card.super_attack_description ++ card_dupe.super_attack_description
        }
      end)
    else
      [card | card_list]
    end
  end
end
