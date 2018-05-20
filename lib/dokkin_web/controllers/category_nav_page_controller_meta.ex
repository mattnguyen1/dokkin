defmodule DokkinWeb.Meta.CategoryNavPageController do
  use DokkinWeb, :controller

  alias Dokkin.APIHelpers
  alias Dokkin.API.LinkService
  alias Dokkin.Card

  def assign_meta_and_render(conn) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    title = "Categories | DBZ Dokkan Battle | dokkin"
    description = "Available card categories in DBZ Dokkan Battle! Find all your categories here."

    conn
    |> assign(:title, title)
    |> assign(:og_title, title)
    |> assign(:og_description, description)
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
    |> assign(:keywords, "dokkin,dokk.in,dokkan battle,dbz,categories")
    |> render("index.html")
  end
end
