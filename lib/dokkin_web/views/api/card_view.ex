defmodule DokkinWeb.API.CardView do
  use DokkinWeb, :view
  use Dokkin.Constants

  def render("index.json", %{cards: cards}) do
    %{
      cards: render_many(cards, DokkinWeb.API.CardView, "card.json")
    }
  end

  def render("card.json", %{card: {card, leader_skill}}) do
    %{
      id: card.id,
      name: card.name,
      alliance_type: @alliance_types[card.awakening_element_type],
      rarity: card.rarity,
      rarity_string: @rarity[card.rarity],
      element: card.element,
      leader_skill: leader_skill
    }
  end
end
