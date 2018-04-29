defmodule DokkinWeb.Meta.CategoryPageController do
  use DokkinWeb, :controller

  alias Dokkin.APIHelpers
  alias Dokkin.API.CategoryService
  alias Dokkin.Card

  def assign_meta_and_render(conn, slug) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    [category_id | _] = String.split(slug, "-")
    %{
      name: category_name
    } = CategoryService.get(category_id)

    title = category_name <> " | Categories | DBZ Dokkan Battle"
    description = "Cards in the \"" <> category_name <> "\" category."
    correct_slug = APIHelpers.normalize_slug(category_id <> "-" <> category_name)

    conn
    |> assign(:title, title)
    |> assign(:og_title, title)
    |> assign(:og_description, description)
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
    |> assign(:keywords, "dokkin,dokk.in,dokkan battle,dbz,category," <> category_name)
    |> maybe_redirect(slug, correct_slug)
  end

  defp maybe_redirect(conn, actual_slug, correct_slug) do
    if actual_slug == correct_slug do
      conn
      |> render("index.html")
    else
      conn
      |> redirect(to: "/category/" <> correct_slug)
    end
  end
end
