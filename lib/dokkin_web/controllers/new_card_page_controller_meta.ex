defmodule DokkinWeb.Meta.NewCardPageController do
  use DokkinWeb, :controller

  alias Dokkin.APIHelpers
  alias Dokkin.API.LinkService
  alias Dokkin.Card

  def assign_meta_and_render(conn) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    title = "New Cards | DBZ Dokkan Battle | dokkin"
    description = "Newly released cards in DBZ Dokkan Battle! Find the latest updates here."

    conn
    |> assign(:title, title)
    |> assign(:og_title, title)
    |> assign(:og_description, description)
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
    |> assign(:keywords, "dokkin,dokk.in,dokkan battle,dbz,new,recent")
    |> render("index.html")
  end
end
