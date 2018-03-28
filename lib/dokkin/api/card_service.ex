defmodule Dokkin.API.CardService do
  @moduledoc """
  The Card Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.Card
  alias Dokkin.LeaderSkill
  @no_card 9999

  def list_cards(name) do
    get_cards_from_cache(name)
  end

  defp get_cards_from_cache(name) do
    Cachex.fetch(:cards_cache, name, fn(slug) ->
        do_list_cards(slug)
    end)
    |> case do
      {:error, _} -> []
      {success, value} when success in [:ok, :commit] -> value
    end
  end

  defp do_list_cards(name) do
    Card
    |> card_exists()
    |> base_card()
    |> has_name(name)
    |> with_leader_skill()
    |> select_with_leader_skill()
    |> Repo.all()
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
