defmodule DokkinWeb.API.CategoryController do
  use DokkinWeb, :controller

  alias Dokkin.API.CategoryService

  def show(conn, %{"id" => id}) do
    render conn, "show.json", %{category: CategoryService.get(id)}
  end

  def index(conn, _) do
    render conn, "index.json", %{categories: CategoryService.get_available()}
  end
end
