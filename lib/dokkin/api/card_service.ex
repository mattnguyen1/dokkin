defmodule Dokkin.API.CardService do
  @moduledoc """
  The Card Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.Card
  alias Dokkin.LeaderSkill
  @no_card 9999

  def get_cards(name) do
    get_cards_from_cache(name)
  end

  def get_cards() do
    get_cards_from_cache()
  end

  defp get_cards_from_cache(name) do
    Repo.fetch_cards(name, &do_get_cards/1, 1)
  end

  defp get_cards_from_cache() do
    Repo.fetch_cards("all_cards", &do_get_cards/0)
  end

  defp do_get_cards(name) do
    Card
    |> has_name(name)
    |> base_card_query()
    |> Repo.all()
  end

  def do_get_cards() do
    Card
    |> base_card_query()
    |> Repo.all()
  end

  defp base_card_query(query) do
    query
    |> card_exists()
    |> base_card()
    |> with_leader_skill()
    |> select_with_leader_skill()
  end

  defp has_name(query, name) do
    query |> where([c], like(c.name, ^name))
  end

  defp select_with_leader_skill(query) do
    from [c, ls] in query,
    select: {c, ls.name}
  end

  defp with_leader_skill(query) do
    from c in query,
    join: ls in LeaderSkill,
    where: c.leader_skill_id == ls.id
  end

  defp base_card(query) do
    from c in query,
    where: fragment(
      "? IN (SELECT card_id FROM card_awakening_routes WHERE type != \"CardAwakeningRoute::Dokkan\")", c.id
    )
  end

  defp card_exists(query) do
    from c in query,
    where: c.card_unique_info_id != @no_card
  end
end
