defmodule DokkinWeb.API.LinkView do
  use DokkinWeb, :view
  use Dokkin.Constants

  alias Dokkin.APIHelpers

  def render("index.json", %{link: link}) do
    render link, DokkinWeb.API.LinkView, "show.json"
  end

  def render("index.json", %{links: links}) do
    %{
      links: render_many(links, DokkinWeb.API.LinkView, "show.json")
    }
  end

  def render("show.json", %{link:
    %{
      id: id,
      name: name,
      description: description
    }
  }) do
    %{
      id: id,
      name: name,
      description: description,
      slug: APIHelpers.normalize_slug(Integer.to_string(id) <> "-" <> name)
    }
  end
end
