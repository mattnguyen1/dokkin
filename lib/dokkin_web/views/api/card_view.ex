defmodule DokkinWeb.API.CardView do
  use DokkinWeb, :view
  use Dokkin.Constants

  alias Dokkin.APIHelpers

  def render("index.json", %{cards: cards, total_results: total_results, marker: marker}) do
    %{
      cards: render_many(cards, DokkinWeb.API.CardView, "show.json"),
      total_results: total_results,
      marker: marker
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
      link1_description: link1_description,
      link2: link2,
      link2_description: link2_description,
      link3: link3,
      link3_description: link3_description,
      link4: link4,
      link4_description: link4_description,
      link5: link5,
      link5_description: link5_description,
      link6: link6,
      link6_description: link6_description,
      link7: link7,
      link7_description: link7_description,
      cat1: cat1,
      cat2: cat2,
      cat3: cat3,
      cat4: cat4,
      cat5: cat5,
      cat6: cat6
    } = card_response} = response) do
    Map.merge(%{
      id: card.id,
      name: card.name,
      alliance_type: @alliance_types[card.awakening_element_type],
      rarity: card.rarity,
      rarity_string: @rarity[card.rarity],
      element: card.element,
      element_string: @element[rem(card.element, 10)],
      leader_skill: leader_skill,
      leader_skill_description: leader_skill_description,
      super_attack: super_attack,
      super_attack_description: super_attack_description,
      passive_description: passive_description,
      links: Enum.reject([link1, link2, link3, link4, link5, link6, link7], &is_nil/1),
      link_descriptions: Enum.reject([link1_description, link2_description, link3_description,
        link4_description, link5_description, link6_description, link7_description], &is_nil/1),
      categories: Enum.reject([cat1, cat2, cat3, cat4, cat5, cat6], &is_nil/1),
      url: APIHelpers.card_url(card_response)
    }, %{
      next_dokkan: get_minimal_view(Map.get(response, :next_dokkan, :nil)),
      prev_dokkan: get_minimal_view(Map.get(response, :prev_dokkan, :nil))
    })
  end

  defp get_minimal_view(%{
    card: card,
    leader_skill: leader_skill
  } = card_response) do
    %{
      id: card.id,
      name: card.name,
      alliance_type: @alliance_types[card.awakening_element_type],
      rarity: card.rarity,
      rarity_string: @rarity[card.rarity],
      element: card.element,
      element_string: @element[rem(card.element, 10)],
      leader_skill: leader_skill,
      url: APIHelpers.card_url(card_response)
    }
  end
  defp get_minimal_view(:nil) do :nil end

  defp is_link_nil(%{name: :nil}) do false end
  defp is_link_nil(_) do true end
end
