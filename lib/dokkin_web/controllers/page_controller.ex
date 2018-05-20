defmodule DokkinWeb.PageController do
  use DokkinWeb, :controller
  use Dokkin.Constants
  
  alias Dokkin.API.CardService
  alias DokkinWeb.Meta.CardPageController
  alias DokkinWeb.Meta.NewCardPageController
  alias DokkinWeb.Meta.LinkPageController
  alias DokkinWeb.Meta.LinkNavPageController
  alias DokkinWeb.Meta.CategoryPageController
  alias DokkinWeb.Meta.CategoryNavPageController
  alias Dokkin.Card

  # /card/:card_slug
  def index(conn, %{"path" => ["card", card_slug]}) do
    conn
    |> CardPageController.assign_meta_and_render(card_slug)
  end

  # /cards/new
  def index(conn, %{"path" => ["cards", "new"]}) do
    conn
    |> NewCardPageController.assign_meta_and_render()
  end

  # /links/:link_slut
  def index(conn, %{"path" => ["links", link_slug]}) do
    conn
    |> LinkPageController.assign_meta_and_render(link_slug)
  end

  # /links
  def index(conn, %{"path" => ["links"]}) do
    conn
    |> LinkNavPageController.assign_meta_and_render()
  end

  # /categories/:category_slug
  def index(conn, %{"path" => ["categories", category_slug]}) do
    conn
    |> CategoryPageController.assign_meta_and_render(category_slug)
  end

  # /categories
  def index(conn, %{"path" => ["categories"]}) do
    conn
    |> CategoryNavPageController.assign_meta_and_render()
  end

  # /
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
    |> assign(:keywords, "dokkin,dokk.in,dokkan battle,dbz")
  end
end
