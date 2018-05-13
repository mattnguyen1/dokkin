defmodule DokkinWeb.API.CategoryView do
  use DokkinWeb, :view
  use Dokkin.Constants

  alias Dokkin.APIHelpers

  def render("index.json", %{category: category}) do
    render category, DokkinWeb.API.CategoryView, "show.json"
  end

  def render("index.json", %{categories: categories}) do
    %{
      categories: render_many(categories, DokkinWeb.API.CategoryView, "show.json")
    }
  end

  def render("show.json", %{category:
    %{
      id: id,
      name: name
    }
  }) do
    %{
      id: id,
      name: name
    }
  end
end
