defmodule Dokkin.API.CardService do
  @moduledoc """
  The Card Service context.
  """

  import Ecto.Query, warn: false
  alias Dokkin.Repo
  alias Dokkin.Card
  @no_card 9999

  def list_cards(name) do
    query = from c in Card,
              where: c.name == ^name and
                      c.card_unique_info_id != @no_card and
                      fragment(
                        "? IN (SELECT card_id FROM card_awakening_routes WHERE type != \"CardAwakeningRoute::Dokkan\")", c.id
                      ),
              select: c

    Repo.all(query)
  end
end
