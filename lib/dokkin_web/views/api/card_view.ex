defmodule DokkinWeb.API.CardView do
  use DokkinWeb, :view

  def render("index.json", %{cards: cards}) do
    %{cards: cards}
  end

  # def render("card.json", %{card: card}) do
  #   %{
  #     id: card.id,
  #     name: card.name,
  #     alliance_type: alliance_types[card.awakening_element_type],
  #
  #   }
  # end
end
