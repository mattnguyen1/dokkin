defmodule DokkinWeb.PageController do
  use DokkinWeb, :controller
  use Dokkin.Constants
  
  alias Dokkin.API.CardService
  alias DokkinWeb.Meta.CardPageController
  alias DokkinWeb.Meta.LinkPageController
  alias Dokkin.Card

  # Card page controller route
  def index(conn, %{"path" => ["card", card_slug]}) do
    conn
    |> CardPageController.assign_meta_and_render(card_slug)
  end

  def index(conn, %{"path" => ["link", link_slug]}) do
    conn
    |> LinkPageController.assign_meta_and_render(link_slug)
  end

  def index(conn, _params) do
    conn
    |> assign_meta()
    |> render("index.html")
  end

  defp assign_meta(conn) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    conn
    |> assign(:title, "dokkin | DBZ Dokkan Battle")
    |> assign(:og_description, "Find all your Dokkan information in one place.")
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
  end
end
