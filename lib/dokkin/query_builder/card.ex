defmodule Dokkin.QueryBuilder.Card do
  @moduledoc """
  Module for building queries for the Card table
  """
  
  import Ecto.Query

  @doc """
  Queries for cards with minimal amount of metadata.
  """
  @spec query_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t

  def query_minimal(query) do
    query
    |> QueryBuilder.Card.from_minimal_card()
    |> QueryBuilder.Card.order_by_atk()
    |> QueryBuilder.Card.select_minimal()
  end

  @doc """
  Queries for cards with detailed amount of metadata.
  """
  @spec query_detailed(Ecto.Queryable.t) :: Ecto.Queryable.t

  def query_detailed(query) do
    query
    |> QueryBuilder.Card.from_detailed_card()
    |> QueryBuilder.Card.order_by_atk()
    |> QueryBuilder.Card.select_detailed()
  end

  @doc """
  Filters query for a limit amount of cards at the given offset  
  """
  @spec where_limit_offset(Ecto.Queryable.t, integer, integer) :: Ecto.Queryable.t

  def where_limit_offset(query, limit, offset) do
    query
    |> limit(^limit)
    |> offset(^offset)
  end

  @doc """
  Filter query where the card name matches the given name
  """
  @spec where_name(Ecto.Queryable.t, String.t) :: Ecto.Queryable.t

  def where_name(query, name) do
    query |> where([c], like(c.name, ^name))
  end

  @doc """
  Filters query for all the cards with the matching ids
  """
  @spec where_ids(Ecto.Queryable.t, list) :: Ecto.Queryable.t

  def where_ids(query, ids) do
    query |> where([c], c.id in ^ids)
  end

  @doc """
  Orders query results by descending attack
  """
  @spec order_by_atk(Ecto.Queryable.t) :: Ecto.Queryable.t

  def order_by_atk(query) do
    query |> order_by([c], [desc: c.atk_max])
  end

  @doc """
  Selects a detailed amount of information for all the card results
  """
  @spec select_detailed(Ecto.Queryable.t) :: Ecto.Queryable.t

  def select_detailed(query) do
    from [c, ls, a, cs, s, p, link1, link2, link3, link4, link5, link6, link7,
          cat1, cat2, cat3, cat4, cat5, cat6] in query,
    select: %{
      card: c,
      leader_skill: ls.name,
      leader_skill_description: ls.description,
      super_attack: [s.name],
      super_attack_description: [s.description],
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

  @doc """
  Selects the minimal amount of information necessary to render a basic card
  """
  @spec select_minimal(Ecto.Queryable.t) :: Ecto.Queryable.t

  def select_minimal(query) do
    from [c, ls, a, p] in query,
    select: %{
      card: c,
      leader_skill: ls.name,
      leader_skill_description: ls.description,
      passive_description: p.description
    }
  end

  @doc """
  Joins all the tables necessary for a detailed card query
  """
  @spec from_detailed_card(Ecto.Queryable.t) :: Ecto.Queryable.t

  def from_detailed_card(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    left_join: a in AwakeningRoutes, on: a.awaked_card_id == c.id,
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
    where: (is_nil(a.type) or a.type == "CardAwakeningRoute::Dokkan"),
    where: (c.rarity >= 4 and fragment("? % 2", c.id) == 1) or (c.rarity < 4 and fragment("? % 2", c.id) == 0),
    where: c.id < 4000000,
    where: c.card_unique_info_id != @no_card_unique_id
  end

  @doc """
  Joins the minimal tables needed for a minimal card query
  """
  @spec from_minimal_card(Ecto.Queryable.t) :: Ecto.Queryable.t

  def from_minimal_card(query) do
    from c in query,
    join: ls in LeaderSkill, on: c.leader_skill_id == ls.id,
    left_join: a in AwakeningRoutes, on: a.awaked_card_id == c.id,
    left_join: p in PassiveSkillSet, on: c.passive_skill_set_id == p.id,
    where: is_nil(a.type) or a.type == "CardAwakeningRoute::Dokkan",
    where: c.card_unique_info_id != @no_card_unique_id
  end
end