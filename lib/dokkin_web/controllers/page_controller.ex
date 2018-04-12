defmodule DokkinWeb.PageController do
  use DokkinWeb, :controller
  use Dokkin.Constants
  
  alias Dokkin.API.CardService
  alias Dokkin.Card

  def index(conn, %{"path" => ["card", card_id]}) do
    conn
    |> assign_meta_and_render(card_id)
  end

  def index(conn, _params) do
    conn
    |> assign_meta()
    |> render("index.html")
  end

  defp assign_meta(conn) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    conn
    |> assign(:title, "dokk.in | DBZ Dokkan Battle")
    |> assign(:og_description, "Find all your Dokkan information in one place.")
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
  end

  defp assign_meta_and_render(conn, slug) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    [card_id | suffix] = String.split(slug, "-")
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
    correct_slug = normalize_slug(Integer.to_string(card.id) <> "-" <> full_name)
    img_card_id = get_id_as_card_id(card_id)
    passive_text = if passive_description do passive_description else "-" end
    title = leader_skill <> " " <> card.name <> " | DBZ Dokkan Battle"
    element_rarity_text = "[" <> rarity <> "] [" <> alliance <> " " <> element <> "] \n"

    conn
    |> assign(:title, title)
    |> assign(:og_title, title)
    |> assign(:og_description, element_rarity_text <> "Leader Skill: " <> leader_skill_description <> "\nPassive: " <> passive_text)
    |> assign(:og_image, "https://static.dokk.in/thumb/card_" <> img_card_id <> "_thumb.png")
    |> assign(:og_url, url)
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

  @spec normalize_slug(String.t) :: String.t
  defp normalize_slug(text) do
    text
    |> WordSmith.remove_accents()
    |> String.downcase()
    |> String.replace("#", "")
    |> String.replace("&", "")
    |> String.replace(~r/ +/, "-")
  end
end
