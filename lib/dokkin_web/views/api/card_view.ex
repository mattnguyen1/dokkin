defmodule DokkinWeb.API.CardView do
  use DokkinWeb, :view
  use Dokkin.Constants

  def render("index.json", %{cards: cards}) do
    %{
      cards: render_many(cards, DokkinWeb.API.CardView, "show.json")
    }
  end

  def render("show.json", %{card: 
    %{
      card: card,
      leader_skill: leader_skill,
      leader_skill_description: leader_skill_description,
      super_attack: super_attack,
      super_attack_description: super_attack_description,
      passive_description: passive_description,
      link1: link1,
      link2: link2,
      link3: link3,
      link4: link4,
      link5: link5,
      link6: link6,
      link7: link7,
      cat1: cat1,
      cat2: cat2,
      cat3: cat3,
      cat4: cat4,
      cat5: cat5,
      cat6: cat6
    }}) do
    %{
      id: card.id,
      name: card.name,
      alliance_type: @alliance_types[card.awakening_element_type],
      rarity: card.rarity,
      rarity_string: @rarity[card.rarity],
      element: card.element,
      leader_skill: leader_skill,
      leader_skill_description: leader_skill_description,
      super_attack: super_attack,
      super_attack_description: super_attack_description,
      passive_description: passive_description,
      links: Enum.reject([link1, link2, link3, link4, link5, link6, link7], &is_nil/1),
      categories: Enum.reject([cat1, cat2, cat3, cat4, cat5, cat6], &is_nil/1)
    }
  end

  def render("show.json", _params) do
    IO.inspect(_params)
  end
end
