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
    query = from c in Card,
              join: ls in LeaderSkill,
              where: like(c.name, ^name) and
                      c.card_unique_info_id != @no_card and
                      fragment(
                        "? IN (SELECT card_id FROM card_awakening_routes WHERE type != \"CardAwakeningRoute::Dokkan\")", c.id
                      ) and
                      c.leader_skill_id == ls.id,
              select: {c, ls.name}

    Repo.all(query)
  end
end
