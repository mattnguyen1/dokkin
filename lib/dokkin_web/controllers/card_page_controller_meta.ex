defmodule DokkinWeb.Meta.CardPageController do
  use DokkinWeb, :controller
  use Dokkin.Constants

  alias Dokkin.APIHelpers
  alias Dokkin.API.CardService
  alias Dokkin.Card

  def assign_meta_and_render(conn, slug) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    [card_id | _] = String.split(slug, "-")
    %{
      card: card,
      leader_skill: leader_skill,
      leader_skill_description: leader_skill_description,
      passive_description: passive_description
    } = CardService.get_minimal(card_id)

    alliance = Card.alliance(card)
    element = Card.element(card)
    rarity = Card.rarity(card)
    full_name = leader_skill <> " " <> card.name
    correct_slug = APIHelpers.normalize_slug(Integer.to_string(card.id) <> "-" <> full_name)
    img_card_id = get_id_as_card_id(card_id)
    passive_text = if passive_description do passive_description else "-" end
    title = full_name <> " | DBZ Dokkan Battle | dokkin"
    char_element_rarity_text = "[" <> rarity <> "] [" <> alliance <> " " <> element <> "] " <> full_name <> "\n"

    conn
    |> assign(:title, title)
    |> assign(:og_title, title)
    |> assign(:og_description, char_element_rarity_text <> "Leader Skill: " <> leader_skill_description <> ".\nPassive: " <> passive_text <> ".")
    |> assign(:og_image, "https://static.dokk.in/thumb/card_" <> img_card_id <> "_thumb.png")
    |> assign(:og_url, url)
    |> assign(:keywords, "dokkin,dokkan battle,dbz,"
      <> rarity <> "," <> element <> "," <> full_name
      <> "," <> get_unique_keywords(card))
    |> maybe_redirect(slug, correct_slug)
  end

  defp maybe_redirect(conn, actual_slug, correct_slug) do
    if actual_slug == correct_slug do
      conn
      |> render("index.html")
    else
      conn
      |> redirect(to: "/card/" <> correct_slug)
    end
  end

  @spec get_id_as_card_id(String.t) :: String.t
  defp get_id_as_card_id(id) do
    id
    |> String.to_integer()
    |> (&(&1 / 10)).()
    |> Kernel.trunc()
    |> (&(&1 * 10)).()
    |> Integer.to_string()
  end

  defp get_unique_keywords(card) do
    []
    |> get_common_card_keyword(card)
    |> get_alt_name_keywords(card)
    |> Enum.join(",")
  end

  defp get_common_card_keyword(keywords, %{rarity: 5} = card) do
    ["lr " <> APIHelpers.get_base_name(card.name) | keywords]
  end
  defp get_common_card_keyword(keywords, card) do
    [APIHelpers.get_base_element(card.element) <> " " <> APIHelpers.get_base_name(card.name) | keywords]
  end

  defp get_alt_name_keywords(keywords, card) do
    if Map.has_key?(@keyword_aliases, String.downcase(card.name)) do
      keywords ++ @keyword_aliases[String.downcase(card.name)]
    else
      keywords
    end
  end
end
