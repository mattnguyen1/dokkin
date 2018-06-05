defmodule Dokkin.API.CardService do
  @moduledoc """
  The Card Service context.
  """

  import Ecto.Query, warn: false
  use Dokkin.Cache
  alias Dokkin.Repo
  alias Dokkin.Card
  alias Dokkin.LeaderSkill
  alias Dokkin.LinkSkills
  alias Dokkin.Categories
  alias Dokkin.Awakenings
  alias Dokkin.AwakeningRoutes
  alias Dokkin.AwakeningItems
  alias Dokkin.PassiveSkillSet
  alias Dokkin.CardSpecials
  alias Dokkin.Specials
  alias Dokkin.QueryBuilder
  alias Dokkin.Query
  @no_card_unique_id 9999
  @sec_in_a_month 2419200

  ##############
  ### Client ###
  ##############

  @doc """
  Get a single card matching the given id
  """
  @spec get(integer) :: Card.t

  def get(id) do
    Benchmark.measure("Dokkin.API.CardService.get(id", fn ->
      List.first(cache_get_by_id(id))
    end)
  end

  @doc """
  Get cards matching all the given ids
  """
  @spec get_from_ids(list) :: list

  def get_from_ids(ids) do
    Benchmark.measure("Dokkin.API.CardService.get_from_ids(ids)", fn ->
      do_get(ids)
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
  Get the upcoming cards within a month
  """
  @spec get_upcoming() :: list

  def get_upcoming() do
    Benchmark.measure("Dokkin.API.CardService.get_upcoming()", fn ->
      cache_get_upcoming()
    end)
  end

  @doc """
  Get the newest cards in the last month
  """
  @spec get_new() :: list

  def get_new() do
    Benchmark.measure("Dokkin.API.CardService.get_new()", fn ->
      cache_get_new()
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

  @spec cache_get_by_id(String.t) :: list
  defp cache_get_by_id(id) do
    cget &do_get_by_id/1, id, :invoke
  end

  @spec cache_get_minimal(String.t) :: list
  defp cache_get_minimal(id) do
    cget &do_get_minimal/1, id, :invoke
  end

  @spec cache_get_next_dokkan(String.t) :: list
  defp cache_get_next_dokkan(id) do
    cget &do_get_next_dokkan/1, id, :invoke
  end

  @spec cache_get_prev_dokkan(String.t) :: list
  defp cache_get_prev_dokkan(id) do
    cget &do_get_prev_dokkan/1, id, :invoke
  end

  @spec cache_get_all() :: list
  defp cache_get_all() do
    cget &do_get_all/0
  end

  @spec cache_get_upcoming() :: list
  defp cache_get_upcoming() do
    cget_date &do_get_upcoming/0
  end

  @spec cache_get_new() :: list
  defp cache_get_new() do
    cget_date &do_get_new/0
  end

  @spec cache_get_base_id(String.t) :: integer
  defp cache_get_base_id(id) when is_binary(id) do
    cget &get_base_id/1, id, :invoke
  end

  @spec cache_get_base_id(integer) :: integer
  defp cache_get_base_id(id) when is_integer(id) do
    id = Integer.to_string(id)
    cget &get_base_id/1, id, :invoke
  end

  ###############
  ### Queries ###
  ###############

  @spec do_get(list) :: list
  defp do_get(ids) when is_list(ids) do
    Card
    |> by_ids(ids)
    |> query_detailed()
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

  @spec do_get_all() :: list
  defp do_get_all() do
    Card
    |> query_detailed()
    |> order_by_atk()
    |> Repo.all()
    |> merge_super_attacks()
  end

  @spec do_get_upcoming() :: list
  defp do_get_upcoming() do
    cache_get_all()
    |> filter_upcoming()
  end

  @spec do_get_new() :: list
  defp do_get_new() do
    cache_get_all()
    |> filter_new()
  end

  #####################
  ### Query Helpers ###
  #####################

  @spec get_base_id(String.t) :: String.t
  defp get_base_id(id) when is_binary(id) do
    query_base_id(id)
    |> Repo.all()
    |> List.first()
    |> do_get_base_id(id)
  end

  defp do_get_base_id(:nil, id) do id end
  defp do_get_base_id(base_id, _) do Integer.to_string(base_id) end

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
    from ar in AwakeningRoutes,
    select: ar.card_id,
    where: ar.awaked_card_id == ^id,
    where: ar.type == "CardAwakeningRoute::Zet"
  end

  @spec query_next_dokkan(integer) :: Ecto.Queryable.t
  defp query_next_dokkan(id) do
    from ar in AwakeningRoutes,
    select: ar.awaked_card_id,
    where: ar.card_id == ^id,
    where: ar.type == "CardAwakeningRoute::Dokkan"
  end

  @spec query_prev_dokkan(integer) :: Ecto.Queryable.t
  defp query_prev_dokkan(id) do
    from ar in AwakeningRoutes,
    select: ar.card_id,
    where: ar.awaked_card_id == ^id,
    where: ar.type == "CardAwakeningRoute::Dokkan"
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
    from [c, ls, ar, cs, s, p, link1, link2, link3, link4, link5, link6, link7,
          cat1, cat2, cat3, cat4, cat5, cat6] in query,
    select: %{
      card: c,
      leader_skill: ls.name,
      leader_skill_description: ls.description,
      super_attack: [s.name],
      super_attack_description: [s.description],
      super_attack_ki: [cs.eball_num_start],
      passive_description: p.description,
      link1: %{
        id: link1.id,
        name: link1.name,
        description: link1.description
      },
      link2: %{
        id: link2.id,
        name: link2.name,
        description: link2.description
      },
      link3: %{
        id: link3.id,
        name: link3.name,
        description: link3.description
      },
      link4: %{
        id: link4.id,
        name: link4.name,
        description: link4.description
      },
      link5: %{
        id: link5.id,
        name: link5.name,
        description: link5.description
      },
      link6: %{
        id: link6.id,
        name: link6.name,
        description: link6.description
      },
      link7: %{
        id: link7.id,
        name: link7.name,
        description: link7.description
      },
      cat1: %{
        id: cat1.id,
        name: cat1.name
      },
      cat2: %{
        id: cat2.id,
        name: cat2.name
      },
      cat3: %{
        id: cat3.id,
        name: cat3.name
      },
      cat4: %{
        id: cat4.id,
        name: cat4.name
      },
      cat5: %{
        id: cat5.id,
        name: cat5.name
      },
      cat6: %{
        id: cat6.id,
        name: cat6.name
      }
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
    left_join: ar in AwakeningRoutes, on: ar.awaked_card_id == c.id,
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
    where: (is_nil(ar.type) or ar.type == "CardAwakeningRoute::Dokkan"),
    where: (c.rarity >= 4 and fragment("? % 2", c.id) == 1) or (c.rarity < 4 and fragment("? % 2", c.id) == 0),
    where: c.id < 4000000
  end

  @spec join_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t
  defp join_minimal(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    left_join: ar in AwakeningRoutes, on: ar.awaked_card_id == c.id,
    left_join: p in PassiveSkillSet, on: c.passive_skill_set_id == p.id,
    where: is_nil(ar.type) or ar.type == "CardAwakeningRoute::Dokkan"
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
          super_attack_description: card.super_attack_description ++ card_dupe.super_attack_description,
          super_attack_ki: card.super_attack_ki ++ card_dupe.super_attack_ki
        }
      end)
    else
      [card | card_list]
    end
  end

  @spec get_link_map(map) :: map
  defp get_link_map(%{id: id, name: name, description: description}) do
    %{
      id: id,
      name: name,
      description: description
    }
  end

  ######################
  ### Result Helpers ###
  ######################

  defp filter_upcoming(results) do
    Enum.filter(results, &is_upcoming/1)
  end

  defp is_upcoming(result) do
    time_diff = NaiveDateTime.diff(result.card.open_at, NaiveDateTime.utc_now())
    time_diff < @sec_in_a_month and time_diff > 0
  end

  defp filter_new(results) do
    Enum.filter(results, &is_new/1)
  end

  defp is_new(result) do
    time_diff = NaiveDateTime.diff(NaiveDateTime.utc_now(), result.card.open_at)
    time_diff < @sec_in_a_month and time_diff > 0
  end
end
