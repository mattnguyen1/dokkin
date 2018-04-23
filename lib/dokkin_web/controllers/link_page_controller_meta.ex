defmodule DokkinWeb.Meta.LinkPageController do
  use DokkinWeb, :controller

  alias Dokkin.APIHelpers
  alias Dokkin.API.LinkService
  alias Dokkin.Card

  def assign_meta_and_render(conn, slug) do
    url = DokkinWeb.Router.Helpers.url(conn) <> conn.request_path
    [link_id | _] = String.split(slug, "-")
    %{
      name: link_name,
      description: link_description
    } = LinkService.get(link_id)

    title = link_name <> " | Links | DBZ Dokkan Battle"
    description = "Effect " <> link_description <> "\nCards with the \"" <> link_name <> "\" link."
    correct_slug = APIHelpers.normalize_slug(link_id <> "-" <> link_name)

    conn
    |> assign(:title, title)
    |> assign(:og_title, title)
    |> assign(:og_description, description)
    |> assign(:og_image, "https://static.dokk.in/thumb/card_1008880_thumb.png")
    |> assign(:og_url, url)
    |> maybe_redirect(slug, correct_slug)
  end

  defp maybe_redirect(conn, actual_slug, correct_slug) do
    if actual_slug == correct_slug do
      conn
      |> render("index.html")
    else
      conn
      |> redirect(to: "/link/" <> correct_slug)
    end
  end
end
