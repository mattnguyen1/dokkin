defmodule DokkinWeb.PageController do
  use DokkinWeb, :controller
  
  alias Dokkin.API.CardService

  def index(conn, %{"path" => ["card", card_id]}) do
    conn
    |> assign_meta(card_id)
    |> render("index.html")
  end

  def index(conn, _params) do
    conn
    |> assign_meta()
    |> render("index.html")
  end

  defp assign_meta(conn) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    conn
    |> assign(:og_title, "dokk.in")
    |> assign(:og_card, "Search for any DBZ Dokkan cards")
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
  end

  defp assign_meta(conn, card_id) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    %{
      card: card,
      leader_skill: leader_skill,
      leader_skill_description: leader_skill_description,
      passive_description: passive_description
    } = CardService.get_minimal(card_id)
    conn
    |> assign(:og_title, leader_skill <> " " <> card.name)
    |> assign(:og_card, "Leader Skill: " <> leader_skill_description <> "\nPassive: " <> passive_description)
    |> assign(:og_image, "https://static.dokk.in/thumb/card_" <> card_id <> "_thumb.png")
    |> assign(:og_url, url)
  end
end
