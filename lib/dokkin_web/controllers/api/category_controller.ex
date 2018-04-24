defmodule DokkinWeb.API.CategoryController do
  use DokkinWeb, :controller

  alias Dokkin.API.CategoryService

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{category: CategoryService.get(id)}
  end
end
